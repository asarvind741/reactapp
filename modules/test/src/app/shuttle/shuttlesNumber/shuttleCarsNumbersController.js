angular
    .module('admin')
    .controller('ShuttleCarsNumbersController', ShuttleCarsNumbersController)

function ShuttleCarsNumbersController(api, $log, $scope, id, $uibModal, utils, securityContext, checkService) {
    var vm = this;
    vm.name = "Shuttles Numbers"
    if (securityContext.data.permissions.shuttle == 'write') {
        vm.showControls = true;
    }

    api.getAllShuttleModelShuttleCars(id).then(function(response) {
        if (response.status == 200) {
            response.data.forEach(function(item) {
                item.name = item.number;
            })
            vm.carsNumbersArr = response.data;
        } else {
            vm.carsNumbersArr = [];
        }
    })

    vm.checkName = function(id, number) {
        return checkService.checkNameWithDublicate(id, number, vm.carsNumbersArr);
    }

    vm.addCarNumberForm = false;

    vm.add = function(item) {

        if (!vm.checkName(0, angular.isUndefined(item) ? undefined : item.number)) {
            return;
        }

        item.loading = true;
        var obj = {
            number: item.number,
            shuttleModelId: id
        }
        api.createShuttleCar(obj).then(function(success) {
            vm.carsNumbersArr.push(success.data);
            vm.addCarNumberForm = false;
            vm.newCarNumber = "";
        })

    }

    vm.delete = function(item) {
        item.loading = true;
        var modalInstance = $uibModal.open({
            templateUrl: 'app/shuttle/shuttleModals/template.html',
            controller: 'ConfirmController as ConfirmCtrl',
            size: 'sm'
        });
        modalInstance.result.then(function(result) {
            if (!result) {
                item.loading = false;
                return;
            }
            api.deleteShuttleCar(item.id).then(function(response) {
                if (response.status == 200) {
                    var doomed = vm.carsNumbersArr.filter(function(car) {
                        return car.id === item.id
                    })[0];
                    var index = vm.carsNumbersArr.indexOf(doomed);
                    vm.carsNumbersArr.splice(index, 1);
                    utils.notify({
                        message: 'Delete shuttle number successfull',
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

    vm.save = function(item) {
        var obj = {
            shuttleModelId: item.shuttleModelId,
            id: item.id,
            number: item.number
        }
        if (!vm.checkName(item.id, item.number)) {
            return "error";
        }
        api.updateShuttleCar(obj).then(function() {
            utils.notify({
                message: 'Shuttle number update successfull',
                type: 'success'
            })
        })
    }

}