angular
    .module('admin')
    .controller('CarsController', carsController)


function carsController(api, $log, $scope, $uibModal, utils, securityContext, checkService) {
    var vm = this;
    vm.addCarForm = false;
    if (securityContext.data.permissions.transportation == 'write') {
        vm.showControls = true;
    }
    api.getTaxiCarModels().then(function(response) {
        if (response.status == 200) {
            if (angular.isArray(response.data)) {
                vm.carsArr = response.data;
            }
        }
    })

    vm.checkName = function(id, name) {
        return checkService.checkNameWithDublicate(id, name, vm.carsArr);
    }

    vm.save = function(item) {

        api.updateTaxiCarModels(item).then(function(response) {
            if (response.status == 200) {
                utils.notify({
                    message: 'Car model name update successfull',
                    type: 'success'
                })
            }
        })
    }

    vm.add = function(item) {

        if (!vm.checkName(0, angular.isUndefined(item) ? undefined : item.name)) {
            return;
        }

        item.loading = true;
        vm.newCar.loading = true;
        var obj = {
            name: item.name
        }
        api.createTaxiCarModel(obj).then(function(response) {
            if (response.status == 200) {
                vm.carsArr.push(response.data);
                vm.addCarForm = false;
                vm.newCar = "";
                vm.newCar.loading = false;
                utils.notify({
                    message: 'Add car model successfull',
                    type: 'success'
                })
            } else {
                vm.newCar.loading = false;
                utils.notify({
                    message: 'Something going wrong',
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
            api.deleteTaxiCarModels(item.id).then(function(response) {
                item.loading = true;
                if (response.status == 200) {
                    item.loading = false;
                    var doomed = vm.carsArr.filter(function(car) {
                        return car.id === item.id
                    })[0];
                    var index = vm.carsArr.indexOf(doomed);
                    vm.carsArr.splice(index, 1);
                    utils.notify({
                        message: 'Delete car model successfull',
                        type: 'success'
                    });

                } else {
                    item.loading = false;
                    utils.notify({
                        message: 'Something going wrong',
                        type: 'success'
                    })
                }
            })
        })
    }


}