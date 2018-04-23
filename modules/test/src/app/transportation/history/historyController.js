'use strict';
angular
    .module('admin')
    .controller('HistoryController', HistoryController)

function HistoryController(api, $log, $uibModal, utils, $scope, $timeout, moment) {
    var vm = this;
    vm.status = 'All';
    vm.showArr = [];
    vm.dateOptions = {
        format: 'yy',
        minMode: 'month',
        maxDate: moment(new Date()).endOf('month')._d
    };
    vm.mode = 'month';
    vm.date = new Date();
    // var endMonth = moment(new Date()).endOf('month')._d;
    vm.open = function() {
        vm.popup.opened = true;
    };
    vm.showSpinner = true;
    vm.popup = {
        opened: false
    };

    vm.showAll = function() {
        vm.showArrFilter = [];
        var startDate = moment(vm.date).startOf('month')._d;
        var endDate = moment(vm.date).endOf('month')._d;
        api.getAllTaxiHistory(startDate, endDate).then(function(response) {
            if (response.status == 200) {
                response.data.forEach(function(item) {
                    item.requestTime += "Z";
                    item.creationTime += "Z";
                })
                vm.showArr = response.data;
                vm.showSpinner = false;
                vm.All();
            } else {
                utils.notify({
                    message: 'Error with loading data',
                    type: 'error'
                });
                vm.showSpinner = false;
            }
        })
    }
    vm.show = function() {
        vm.showArrFilter = [];
        var startDate = moment(vm.date).startOf('month');
        var endDate = moment(vm.date).endOf('month')
        if (angular.isArray(vm.showArr)) {
            vm.showArrFilter = vm.showArr.filter(function(item) {
                if (moment(item.creationTime).isBetween(startDate, endDate)) {
                    if (vm.status == 'All') {
                        return item;
                    } else if (item.status == vm.status) {
                        return item;
                    }
                }
            })


        }
    }

    vm.All = function() {
        vm.status = 'All';
        vm.show();
    }

    vm.completed = function() {
        vm.status = 'Completed';
        vm.show();
    };

    vm.rejected = function() {
        vm.status = 'Rejected';
        vm.show();
    };


    $scope.$watch(function() {
        return vm.allArr;
    }, function() {

        $timeout(function() {
            vm.show();
        }, 100)
    });
    $scope.$watch(function() {
        return vm.date;
    }, function() {
        vm.showSpinner = true;
        $timeout(function() {
            vm.showAll();
        }, 100)
    });

}