'use strict';
angular
    .module('admin')
    .controller('ShuttleDestinationsController', ShuttleDestinationsController)

function ShuttleDestinationsController(api, $log, $uibModal, utils, securityContext, checkService) {
    var vm = this;

    if (securityContext.data.permissions.shuttle == 'write') {
        vm.showControls = true;
    }


    vm.checkName = function(id, name) {
        return checkService.checkNameWithDublicate(id, name, vm.mapPointsArr);
    }

    api.getShuttleDestinaions().then(function(response) {
        if (response.status == 200) {
            if (angular.isArray(response.data)) {
                vm.mapPointsArr = response.data;
            } else vm.mapPointsArr = [];
        }

    });

    vm.save = function(item) {
        api.updateShuttleDestinaion(item).then(function(response) {
            if (response.status == 200) {
                utils.notify({
                    message: 'Destination with  name: "' + response.data.name + '" updated successfully',
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


        api.createShuttleDestinaion({
            name: item.name
        }).then(function(response) {
            if (response.status == 200) {
                vm.mapPointsArr.push(response.data)
                vm.newDestination = "";
            }
        })



    }

    vm.delete = function(item) {
        item.loading = true;
        vm.modalInstance = $uibModal.open({
            templateUrl: 'app/shuttle/shuttleModals/modalDelDestination.html',
            controller: 'modalDelDestinationController as modalDelCtrl',
            resolve: {
                item: function() {
                    return item;
                }
            }
        });

        vm.modalInstance.result.then(function(result) {


            if (!result) {
                item.loading = false;
                return;
            }
            item.loading = true;
            api.deleteShuttleDestinaion(result.id).then(function(response) {
                if (response.status == 200) {
                    var doomed = vm.mapPointsArr.filter(function(item) {
                        return item.id === result.id
                    })[0];
                    vm.index = vm.mapPointsArr.indexOf(doomed);
                    vm.mapPointsArr.splice(vm.index, 1);
                    utils.notify({
                        message: 'Delete destination successfull',
                        type: 'success'
                    })
                } else {
                    utils.notify({
                        message: 'Something going wrong',
                        type: 'error'
                    });
                    item.loading = false;
                }
            })
        });
    };

}