angular
    .module('admin')
    .controller('DriverController', driverController)


function driverController(api, $scope, $uibModal, utils, webApi, securityContext, checkService) {
    var vm = this;
    if (securityContext.data.permissions.transportation == 'write') {
        vm.showControls = true;
    }

    vm.search = "";
    vm.newDriver = false;
    api.getDrivers().then(function(response) {
        if (response.status == 200) {
            vm.driversArr = response.data;
        }
    });



    vm.checkName = function(id, name) {
        return checkService.checkNameWithDublicate(id, name, vm.driversArr);
    }
    vm.checkPhone = function(phone) {
        return checkService.checkPhone(phone);
    }

    vm.save = function(item) {
        api.updateDriver(item).then(function(response) {
            if (response.status == 200) {
                utils.notify({
                    message: 'Update driver successfully',
                    type: 'success'
                })
            }
        })
    }

    vm.delete = function(item) {
        item.loading = true;
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/confirm/template.html',
            controller: 'ConfirmController as ConfirmCtrl',
            size: 'sm'
        });
        modalInstance.result.then(function(result) {
            if (!result) {
                item.loading = false;
                return;
            }
            api.deleteDriver(item.id).then(function(response) {
                if (response.status == 200) {
                    var doomed = vm.driversArr.filter(function(driver) {
                        return driver.id === item.id
                    })[0];
                    var index = vm.driversArr.indexOf(doomed);
                    vm.driversArr.splice(index, 1);
                    utils.notify({
                        message: 'Delete driver successfully',
                        type: 'success'
                    })
                } else {
                    utils.notify({
                        message: 'Something going wrong',
                        type: 'success'
                    })
                    item.loading = false;
                }
            })
        })
    }

    vm.add = function(item) {

        if (!vm.checkName(0, angular.isUndefined(item) ? undefined : item.name, vm.driversArr) || !vm.checkPhone(item.phone)) {
            return;
        }

        item.loading = true;

        var obj = {
            "name": item.name,
            "phone": item.phone
        }
        api.addDriver(obj).then(function(response) {
            if (response.status == 200) {
                vm.driversArr.push(response.data);
                vm.newDriverObj = "";
                vm.newDriver = false;
            }
        })
    }
}