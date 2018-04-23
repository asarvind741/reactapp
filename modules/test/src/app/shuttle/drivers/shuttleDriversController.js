angular
    .module('admin')
    .controller('ShuttleDriversController', ShuttleDriversController)

function ShuttleDriversController(api, utils, $uibModal, $log, $state, broadcastService, webApi, $scope, $q, $timeout, securityContext, checkService) {
    var vm = this;
    vm.name = "Drivers";
    if (securityContext.data.permissions.shuttle == 'write') {
        vm.showControls = true;
    }
    api.getAllShuttleDrivers().then(function(response) {
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
        $timeout(function() {
            api.updateShuttleDriver(item).then(function(response) {
                if (response.status == 200) {
                    utils.notify({
                        message: 'Update successfull',
                        type: 'success'
                    })
                }
            })
        }, 100)


    }
    vm.delete = function(item) {
        var modalInstance = $uibModal.open({
            templateUrl: 'app/shuttle/shuttleModals/template.html',
            controller: 'ConfirmController as ConfirmCtrl',
            size: 'sm'
        });
        modalInstance.result.then(function(result) {
            if (!result) {
                vm.loading = false;
                return;
            }
            api.deleteShuttleDriver(item.id).then(function(response) {
                if (response.status == 200) {
                    var doomed = vm.driversArr.filter(function(driver) {
                        return driver.id === item.id
                    })[0];
                    var index = vm.driversArr.indexOf(doomed);
                    vm.driversArr.splice(index, 1);
                    utils.notify({
                        message: 'Delete driver successfull',
                        type: 'success'
                    })
                } else {
                    utils.notify({
                        message: 'Something going wrong',
                        type: 'success'
                    })
                    vm.loading = false;
                }
            })
        })
    }
    vm.add = function(item) {
        if (!vm.checkName(0, angular.isUndefined(item) ? "" : item.name, vm.driversArr) || !vm.checkPhone(item.phone)) {
            return;
        }
        item.loading = true;
        var obj = {
            "name": item.name,
            "phone": item.phone
        }
        api.createShuttleDriver(obj).then(function(response) {
            if (response.status == 200) {
                vm.driversArr.push(response.data);
                vm.newDriverObj = "";
                vm.newDriver = false;
            }
        })
    }
}