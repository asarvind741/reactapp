angular
    .module('admin')
    .controller('CarsNumbersController', CarsNumbersController)


function CarsNumbersController(api, $log, $scope, id, $uibModal, utils, securityContext, checkService) {
    var vm = this;
    if (securityContext.data.permissions.transportation == 'write') {
        vm.showControls = true;
    }

    api.getCarModelTaxiCars(id).then(function(response) {
        if (response.status == 200) {
            response.data.forEach(function(item) {
                item.name = item.number;
            })
            vm.carsNumbersArr = response.data;
        } else {
            vm.carsNumbersArr = [];
        }

    })

    vm.addCarNumberForm = false;

    vm.checkName = function(id, number) {
        return checkService.checkNameWithDublicate(id, number, vm.carsNumbersArr);
    }

    vm.add = function(item) {

        if (!vm.checkName(0, angular.isUndefined(item) ? undefined : item.number)) {
            return;
        }

        item.loading = true;
        var obj = {
            number: item.number,
            carModelId: id
        }

        api.createTaxiCar(obj).then(function(success) {
            vm.carsNumbersArr.push(success.data);
            vm.addCarForm = false;
            vm.newCarNumber = "";
            item.loading = false;
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

            api.deleteTaxiCar(item.id).then(function(response) {
                if (response.status == 200) {
                    var doomed = vm.carsNumbersArr.filter(function(car) {
                        return car.id === item.id
                    })[0];
                    var index = vm.carsNumbersArr.indexOf(doomed);
                    vm.carsNumbersArr.splice(index, 1);
                    utils.notify({
                        message: 'Delete car number successfull',
                        type: 'success'
                    });
                    item.loading = false;
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

    vm.save = function(item) {
        var obj = {
            carModelId: item.carModelId,
            id: item.id,
            number: item.number
        }
        api.updateTaxiCar(obj).then(function() {
            utils.notify({
                message: 'Car number update successfull',
                type: 'success'
            })
        })
    }

}