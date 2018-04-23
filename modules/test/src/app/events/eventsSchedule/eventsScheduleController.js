angular
    .module('admin')
    .controller('EventsScheduleController', EventsScheduleController)

function EventsScheduleController(api, $log, $scope, $timeout, $filter, $uibModal, utils, securityContext, moment) {
    var vm = this;
    vm.name = "Schedule";
    vm.showSpinner = true;
    if (securityContext.data.permissions.events == 'write') {
        vm.showControls = true;
    }
    vm.dateOptions = {
        format: 'MMMM yyyy',
        minMode: 'month',
        showWeeks: false,
        minDate: new Date()
    };
    vm.minTime = new Date();
    vm.date = new Date();
    vm.open = function() {
        vm.popup.opened = true;
    };
    vm.popup = {
        opened: false
    };
    vm.types = {
        month: {
            format: 'MMMM yyyy',
            minMode: 'month',
            showWeeks: false,

            minDate: new Date()
        },
        day: {
            format: 'dd MMMM yyyy',
            minMode: 'day',
            showWeeks: false,
            minDate: new Date(vm.date.getFullYear(), vm.date.getMonth(), 1)
        }
    };

    vm.type = 0;
    vm.changePeriod = function(type) {
        vm.showSpinner = true;
        switch (type) {
            case 0:
                vm.eventsArr = [];
                vm.type = 0;
                vm.dateOptions = vm.types.month;
                var startDate1 = moment(vm.date)._d;
                api.getAllEventsPerMonth(startDate1).then(function(response) {
                    vm.eventsArr = [];
                    vm.showSpinner = false;
                    response.data.forEach(function(item) {
                        if (item.repeatEventState == 1 || item.repeatEventState == 3) {
                            item.dates.forEach(function(innerItem) {
                                var newItem = angular.copy(item);
                                newItem.creationDate = innerItem;
                                newItem.loading = false;
                                vm.eventsArr.push(newItem);
                            })
                        } else {
                            item.loading = false;
                            vm.eventsArr.push(item);
                        }
                    })
                });
                break;
            case 1:
                vm.eventsArr = [];
                vm.type = 1;
                vm.dateOptions = vm.types.day;
                var startDate2 = moment(vm.date)._d;
                api.getAllEventsPerDay(startDate2).then(function(response) {
                    if (response.status == 200) {
                        vm.showSpinner = false;
                        response.data.forEach(function(item) {
                            item.loading = false;
                        });
                        vm.eventsArr = response.data;
                    }
                });
        }
    }

    vm.repeateStates = [{
            id: 0,
            name: "One time"
        },
        {
            id: 1,
            name: "Weekly"
        },
        {
            id: 2,
            name: "Monthly"
        },
        {
            id: 3,
            name: "Quartely"
        },
        {
            id: 4,
            name: "Yearly"
        }
    ]

    vm.delete = function(item) {
        item.loading = true;

        vm.modalInstance = $uibModal.open({
            templateUrl: 'app/events/eventsModals/modalDeleteEvent.template.html',
            controller: 'modalDeleteEventController as modalDeleteEventCtrl',
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
            if (result.deleteGroup == 1) {
                var obj = {
                    "id": item.id,
                    "excludeDate": item.creationDate
                }
                api.addExcludeDate(obj).then(function(response) {
                    if (response.status == 200) {
                        var doomed = vm.eventsArr.filter(function(item) {

                            if (item.id === response.data.id && item.creationDate === response.data.excludeDate) {
                                return item
                            }
                        })[0];
                        var index = vm.eventsArr.indexOf(doomed);
                        vm.eventsArr.splice(index, 1);
                        utils.notify({
                            message: 'Delete ' + result.name + ' successfully',
                            type: 'success'
                        });
                    } else {
                        utils.notify({
                            message: 'Something going wrong',
                            type: 'error'
                        });
                        item.loading = false;
                    }
                })
            } else if (result.deleteGroup == 2 || angular.isUndefined(result.deleteGroup)) {
                var obj2 = {
                    'name': item.name
                }
                api.deleteEvent(item.id).then(function(response) {
                    if (response.status == 200) {
                        var arrWithoutItem = vm.eventsArr.filter(function(value) { return value.id != item.id });
                        vm.eventsArr = arrWithoutItem;
                        utils.notify({
                            message: 'Delete ' + obj2.name + ' successfully',
                            type: 'success'
                        });
                    } else {
                        utils.notify({
                            message: 'Something going wrong',
                            type: 'error'
                        });
                        item.loading = false;
                    }
                })
            }

        })
    }

    vm.sortField = 'creationDate';
    vm.sortBy = function(field) {
        vm.sortField = vm.sortField === field ? '-' + vm.sortField : field;
    };

    $scope.$watch(function() {
        return vm.date;
    }, function() {
        vm.showSpinner = true;
        $timeout(function() {
            if (vm.type == 0) {
                vm.changePeriod(0);
            }
            if (vm.type == 1) {
                vm.changePeriod(1);
            }
        }, 100)
    });

}