angular
    .module('admin')
    .controller('ShuttleCarsController', ShuttleCarsController)

function ShuttleCarsController(api, utils, $uibModal, $log, $state, broadcastService, webApi, $scope, $q, $timeout, securityContext, checkService) {
    var vm = this;
    vm.name = "Shuttles";
    if (securityContext.data.permissions.shuttle == 'write') {
        vm.showControls = true;
    }

    api.getShuttleModels().then(function(response) {
        if (response.status == 200) {
            if (angular.isArray(response.data)) {
                vm.carsArr = response.data;
            }
        }
    })

    vm.checkName = function(id, name) {
        return checkService.checkNameWithDublicate(id, name, vm.carsArr);
    }

    vm.add = function(item) {

        if (!vm.checkName(0, angular.isUndefined(item) ? undefined : item.name)) {
            return;
        }

        item.loading = true;
        var obj = {
            name: item.name
        }
        api.createShuttleModel(obj).then(function(response) {
            if (response.status == 200) {

                vm.carsArr.push(response.data);
                vm.addCarForm = false;
                vm.newCar = "";
            }
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
            api.deleteShuttleModel(item.id).then(function(response) {
                if (response.status == 200) {
                    var doomed = vm.carsArr.filter(function(car) {
                        return car.id === item.id
                    })[0];
                    var index = vm.carsArr.indexOf(doomed);
                    vm.carsArr.splice(index, 1);
                    utils.notify({
                        message: 'Delete Shuttle successfull',
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

        api.updateShuttleModel(item).then(function(reponse) {
            if (reponse.status == 200) {
                utils.notify({
                    message: 'Shuttle update successfull',
                    type: 'success'
                })
            }
        })
    }
}