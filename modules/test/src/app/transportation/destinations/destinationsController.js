'use strict';
angular
    .module('admin')
    .controller('DestinationsController', DestinationsCtrl)

function DestinationsCtrl(api, $log, $uibModal, utils, securityContext, checkService) {
    var vm = this;
    if (securityContext.data.permissions.transportation == 'write') {
        vm.showControls = true;
    }
    vm.showSpinner = true;
    api.getTaxiDestinations().then(function(response) {
        if (response.status == 200) {
            if (angular.isArray(response.data)) {
                vm.mapPointsArr = response.data;
                vm.showSpinner = false;
            }
        } else {
            vm.mapPointsArr = [];
            vm.showSpinner = false;
        }
    })

    vm.save = function(item) {
        item.loading = false;
        api.updateTaxiDestination(item).then(function(response) {
            if (response.status == 200) {
                utils.notify({
                    message: 'Destination with  name: "' + response.data.name + '" updated successfully',
                    type: 'error'
                })
            }
        })
    }

    vm.checkName = function(id, name) {
        return checkService.checkNameWithDublicate(id, name, vm.mapPointsArr);
    }


    vm.add = function(item) {
        if (!vm.checkName(0, angular.isUndefined(item) ? undefined : item.name)) {
            return;
        }

        item.loading = true;
        api.createTaxiDestination({ name: item.name }).then(function(response) {
            if (response.status == 200) {
                vm.mapPointsArr.push(response.data)
                vm.newDestination = "";
                item.loading = false;
                utils.notify({
                    message: 'Destination added successfully',
                    type: 'success'
                })
            }
        })
    }

    vm.delete = function(item) {
        item.loading = true;
        vm.modalInstance = $uibModal.open({
            templateUrl: 'app/transportation/modals/modalDelDestination.html',
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
            api.deleteTaxiDestination(result.id).then(function(response) {
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
                        type: 'success'
                    })
                    vm.loading = false;
                }
            })

        });
    };
}