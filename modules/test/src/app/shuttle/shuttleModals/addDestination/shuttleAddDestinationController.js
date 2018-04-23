function ShuttleAddDestinationController($uibModalInstance, day, dayOfWeek, date, item, id, $filter, $scope, $timeout, api, utils) {
    var vm = this;

    vm.weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    vm.choosenDay = day;

    if (id === 0) {
        vm.item = {
            destinationName: "",
            dayOfWeek: vm.choosenDay,
            month: date,
            id: 0,
            uniqDays: "",
            destinationPoint: "",
            leavePoint: "",
            shuttleTransfers: [{
                leaveDestination: new Date(),
                leaveKapsarc: new Date()
            }]
        };
        vm.selectedDates = [];
    } else {
        vm.item = item;
        vm.str = vm.item.uniqDays.toString();
        vm.subStr = vm.str.substring(3);
        vm.selectedDates = vm.subStr.length > 3 ? vm.subStr.split('&') : [];
        vm.item.uniqDays = vm.selectedDates.length === 0 ? "" : vm.item.uniqDays;
        vm.item.shuttleTransfers.forEach(function(item) {
            item.leaveDestination = new Date(item.leaveDestination);
            item.leaveKapsarc = new Date(item.leaveKapsarc);
        })
    }

    vm.custom = [];
    vm.dateOptions = {
        format: 'yy',
        minDate: new Date(),
        showWeeks: false
    };

    vm.minTime = new Date();
    vm.date = angular.copy(date);

    vm.open = function() {
        vm.popup.opened = true;
    };


    vm.popup = {
        opened: false
    };

    vm.choosenDay = day;
    vm.changeDay = false;

    vm.changeDays = function() {
        vm.custom = [];
        if (vm.choosenDay != day) {
            vm.changeDay = true;
        }
        if (vm.changeDay) {
            vm.item.uniqDays = "";
            vm.selectedDates = [];
        }

        var indexOfDay = vm.weekDays.indexOf(vm.choosenDay);

        function getWeekDays(day) {
            var d = angular.copy(date),
                month = d.getMonth(),
                weekdays = [];
            d.setDate(1);
            while (d.getDay() !== day) {
                d.setDate(d.getDate() + 1);
            }
            while (d.getMonth() === month) {
                weekdays.push($filter('date')(new Date(d.getTime()), ' dd '));
                d.setDate(d.getDate() + 7);
            }
            return weekdays;
        }
        vm.custom = getWeekDays(indexOfDay);
    }

    vm.changeDays();
    vm.selectDate = function() {
        vm.item.uniqDays = "";
        vm.str = vm.selectedDates.join('&');
        vm.selectedStr = $filter('date')(date, 'MMM') + vm.str;
        vm.item.uniqDays = vm.selectedStr;
    }

    vm.addNewTime = function() {
        if (vm.item.shuttleTransfers.length > 1) {
            return
        } else {
            var NewTime = {
                leaveDestination: new Date(),
                leaveKapsarc: new Date()
            };
            vm.item.shuttleTransfers.push(NewTime);
        }
    }

    vm.removeTransfer = function($index) {
        vm.item.shuttleTransfers.splice($index, 1);
    }


    $scope.$watch(function() {
        return vm.selectedDates;
    }, function() {
        $timeout(function() {
            vm.selectDate();
        }, 100)
    });

    vm.ok = function() {

        if (angular.isUndefined(vm.item.destinationName) || vm.item.destinationName === "") {
            vm.errName = 'errorName';
            vm.errDestinationPointName = "";
            vm.errLeavePointName = "";
            utils.notify({
                message: "Destination name can't be empty",
                type: 'warning'
            });
            return;
        }

        if (angular.isUndefined(vm.item.destinationPoint) || vm.item.destinationPoint === "") {
            vm.errName = "";
            vm.errDestinationPointName = 'errorName';
            vm.errLeavePointName = "";

            utils.notify({
                message: "Destination Point can't be empty",
                type: 'warning'
            });
            return;
        }

        if (angular.isUndefined(vm.item.leavePoint) || vm.item.leavePoint === "") {
            vm.errName = "";
            vm.errDestinationPointName = "";
            vm.errLeavePointName = 'errorName';
            utils.notify({
                message: "Leave Point can't be empty",
                type: 'warning'
            });
            return;
        }

        vm.errName = "";
        vm.errDestinationPointName = "";
        vm.errLeavePointName = "";

        vm.item.loading = true;

        vm.item.uniqDays = vm.selectedDates.length === 0 ? "" : vm.item.uniqDays;

        vm.item.dayOfWeek = vm.weekDays.indexOf(vm.choosenDay);



        vm.item.month = id != 0 ? vm.item.month : $filter('date')(vm.item.month, 'yyyy-MM-ddTHH:mm');

        var goodTime = true;


        vm.item.shuttleTransfers.forEach(function loop(item) {
            if (!angular.isDate(item.leaveDestination)) {
                utils.notify({
                    message: 'Choose another time for leave destination',
                    type: 'warning'
                });
                goodTime = false;
                loop.stop = true;
            }
            if (Date.parse(item.leaveKapsarc) >= Date.parse(item.leaveDestination)) {
                utils.notify({
                    message: 'Choose another time for leave destination',
                    type: 'warning'
                });
                goodTime = false;
                loop.stop = true;
            }
            if (loop.stop) {
                return goodTime;
            }

        })

        if (!goodTime) {
            vm.item.loading = false;
            return;
        }
        vm.item.shuttleTransfers.forEach(function(item) {
            if (angular.isDate(item.leaveDestination)) {
                item.leaveDestination = $filter('date')(item.leaveDestination, 'yyyy-MM-ddTHH:mm');
            }
            if (angular.isDate(item.leaveKapsarc)) {
                item.leaveKapsarc = $filter('date')(item.leaveKapsarc, 'yyyy-MM-ddTHH:mm');
            }
        })

        if (id == 0) {
            api.createShuttleRace(vm.item).then(function(response) {
                if (response.status == 200) {
                    response.data.choosenDay = vm.choosenDay;
                    $uibModalInstance.close(response.data);
                } else {
                    if (response.status == 400) {
                        utils.notify({
                            message: response.data,
                            type: 'warning'
                        });
                    } else {
                        utils.notify({
                            message: 'Something going wrong',
                            type: 'warning'
                        });
                    }
                    vm.item.loading = false;
                }

            })
        } else {
            api.updateShuttleRace(vm.item).then(function(response) {
                if (response.status == 200) {
                    response.data.choosenDay = vm.choosenDay;
                    $uibModalInstance.close(response.data);
                } else {
                    if (response.status == 400) {
                        utils.notify({
                            message: response.data,
                            type: 'warning'
                        });
                    } else {
                        utils.notify({
                            message: 'Something going wrong',
                            type: 'warning'
                        });
                    }
                    vm.item.loading = false;
                }
            })
        }

    };

    vm.deleteItem = function() {
        vm.item.loading = true;
        api.deleteShuttleRace(vm.item.id).then(function(response) {
            if (response.status == 200) {
                vm.item.event = 'delete';
                vm.item.choosenDay = vm.choosenDay;
                $uibModalInstance.close(vm.item);
            }
        })
    };

    vm.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

}

angular
    .module('admin')
    .controller('ShuttleAddDestinationController', ShuttleAddDestinationController)