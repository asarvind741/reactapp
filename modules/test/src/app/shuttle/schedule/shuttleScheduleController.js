angular
    .module('admin')
    .controller('ShuttleScheduleController', ShuttleScheduleController)

function ShuttleScheduleController(api, utils, $uibModal, $state, broadcastService, webApi, $scope, $q, $timeout, securityContext) {
    var vm = this;
    vm.name = "Schedule";
    vm.showSpinner = true;
    vm.showControls = securityContext.data.permissions.shuttle == 'write' ? true : false;
   

    vm.dateOptions = {
        format: 'yy',
        minMode: 'month'
    };
    vm.mode = 'month';
    vm.date = new Date();

    vm.open = function() {
        vm.popup.opened = true;
    };
    vm.showSpinner = true;

    vm.popup = {
        opened: false
    };


    vm.changePeriod = function() {
        vm.showSpinner = true;
        api.getAllShuttleRaces(vm.date).then(function(response) {
            if (response.status == 200) {
                vm.allData = response.data;
                vm.setDay(new Date().getDay());
                vm.showSpinner = false;
            } else {
                if (response.status == 204) {
                    vm.allData = {}
                    vm.setDay(new Date().getDay());
                    vm.showSpinner = false;
                }
            }
        })
    }

    vm.setDay = function(dayNumber) {
        switch (dayNumber) {
            case 0:
                vm.day = "Sunday";
                vm.dayOfWeek = 0;
                vm.data = vm.allData.Sunday;
                break;
            case 1:
                vm.day = "Monday";
                vm.dayOfWeek = 1;
                vm.data = vm.allData.Monday;
                break;
            case 2:
                vm.day = "Tuesday";
                vm.dayOfWeek = 2;
                vm.data = vm.allData.Tuesday;
                break;
            case 3:
                vm.day = "Wednesday";
                vm.dayOfWeek = 3;
                vm.data = vm.allData.Wednesday;
                break;
            case 4:
                vm.day = "Thursday";
                vm.dayOfWeek = 4;
                vm.data = vm.allData.Thursday;
                break;
            case 5:
                vm.day = "Friday";
                vm.dayOfWeek = 5;
                vm.data = vm.allData.Friday;
                break;
            case 6:
                vm.day = "Saturday";
                vm.dayOfWeek = 6;
                vm.data = vm.allData.Saturday;
                break;
        }
    }


    vm.delDestination = function(item, $index, day) {
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
            api.deleteShuttleRace(item.id).then(function(response) {
                if (response.status == 200) {
                    utils.delete(vm.allData[day], item.id);
                    if (vm.allData[day].length == 0) {
                        delete vm.allData[day];
                    }
                }
            })

        })
    }

    vm.addNewDestination = function() {
        console.log("check", securityContext.data);
        var modalInstance = $uibModal.open({
            templateUrl: 'app/shuttle/shuttleModals/addDestination/shuttleAddDestionation.template.html',
            controller: 'ShuttleAddDestinationController as addDestCtrl',
            backdrop: false,
            resolve: {
                day: function() {
                    return vm.day;
                },
                dayOfWeek: function() {
                    return vm.dayOfWeek;
                },
                date: function() {
                    return vm.date;
                },
                id: function() {
                    return 0;
                },
                item: function() {
                    return {}
                }
            }
        });
        modalInstance.result.then(function(result) {
            if (!result) return;
            if (!angular.isArray(vm.allData[result.choosenDay])) {
                vm.allData[result.choosenDay] = [];
            }
            vm.allData[result.choosenDay].push(result);
        })
    }

    vm.updDestination = function(item, day) {
        var modalInstance = $uibModal.open({
            templateUrl: 'app/shuttle/shuttleModals/addDestination/shuttleAddDestionation.template.html',
            controller: 'ShuttleAddDestinationController as addDestCtrl',
            backdrop: false,
            resolve: {
                day: function() {
                    return day;
                },
                dayOfWeek: function() {
                    return vm.dayOfWeek;
                },
                date: function() {
                    return vm.date;
                },
                id: function() {
                    return item.id;
                },
                item: function() {
                    return angular.copy(item);
                }
            }
        });
        modalInstance.result.then(function(result) {
            if (!result) return;
            utils.delete(vm.allData[result.choosenDay], result.id);

            if (result.event != 'delete') {
                vm.allData[result.choosenDay].push(result);
            }
            if (vm.allData[result.choosenDay].length == 0) {
                delete vm.allData[result.choosenDay];
            }
        })
    }


    $scope.$watch(function() {
        return vm.date;
    }, function() {
        $timeout(function() {
            vm.changePeriod();
        }, 100)
    });
}