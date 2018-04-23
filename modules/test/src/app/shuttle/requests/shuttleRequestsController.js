angular
    .module('admin')
    .controller('ShuttleRequestsController', ShuttleRequestsController)

function ShuttleRequestsController(api, utils, $uibModal, $log, $state, broadcastService, webApi, mainHub, $scope, $filter, $timeout, $rootScope, $interval, securityContext) {
    var vm = this;
    vm.name = "Requests";
    if (securityContext.data.permissions.shuttle == 'write') {
        vm.showControls = true;
    }
    var timer;
    vm.inProgress = [];
    vm.completedArr = [];
    vm.allAssigned = [];
    vm.showSpinner = true;
    vm.dateOptions = {
        minMode: 'day',
        maxDate: new Date()
    };
    vm.date = new Date();

    vm.dateforInprogress = new Date();
    vm.open = function() {
        vm.popup.opened = true;
    };
    vm.showSpinner = true;
    vm.popup = {
        opened: false
    };

    vm.filterByTime = function(data) {
        if (
            (vm.inProgress.filter(function(e) { return e.id === data.id; }).length > 0) ||
            (vm.completedArr.filter(function(e) { return e.id === data.id; }).length > 0)
        ) { return; } else {
            var nowDate = new Date();
            var itemTime = new Date(data.creationTime);
            var nowDateThirtyMinLater = new Date(nowDate);
            var itemTimeThirtyMinLater = new Date(itemTime);

            nowDateThirtyMinLater.setMinutes(nowDate.getMinutes() + 30);
            itemTimeThirtyMinLater.setMinutes(itemTime.getMinutes() + 30);
            nowDate = nowDate.toISOString();
            itemTime = itemTime.toISOString();
            nowDateThirtyMinLater = nowDateThirtyMinLater.toISOString();
            itemTimeThirtyMinLater = itemTimeThirtyMinLater.toISOString();
            var now_date = Date.parse(nowDate);
            var item_time_thirty_min = Date.parse(itemTimeThirtyMinLater);
            if (now_date < item_time_thirty_min) {
                vm.inProgress.push(data);
            } else if (
                item_time_thirty_min < now_date
            ) {
                vm.completedArr.unshift(data);
            }
        }
    };

    vm.filterInProgressByTime = function(item) {

        var nowDate = new Date();
        var itemTime = new Date(item.creationTime);
        var nowDateThirtyMinLater = new Date(nowDate);
        var itemTimeThirtyMinLater = new Date(itemTime);
        nowDateThirtyMinLater.setMinutes(nowDate.getMinutes() + 30);
        itemTimeThirtyMinLater.setMinutes(itemTime.getMinutes() + 30);
        nowDate = nowDate.toISOString();
        itemTime = itemTime.toISOString();
        nowDateThirtyMinLater = nowDateThirtyMinLater.toISOString();
        itemTimeThirtyMinLater = itemTimeThirtyMinLater.toISOString();
        var now_date = Date.parse(nowDate);
        var item_time_thirty_min = Date.parse(itemTimeThirtyMinLater);
        if (
            item_time_thirty_min < now_date &&
            !(vm.completedArr.filter(function(e) { return e.id === item.id; }).length > 0)
        ) {
            if (vm.date.getDay() == vm.dateforInprogress.getDay()) {
                vm.completedArr.unshift(item);
            }
            utils.delete(vm.inProgress, item.id);
        }

    }

    vm.startFilter = function() {
        vm.inProgress.forEach(function(item) {
            vm.filterInProgressByTime(item);
        })
    }

    $scope.$on('closeShuttleWS', function() {
        $interval.cancel(timer);
        $scope.$apply();
    })


    vm.getCompleted = function() {
        vm.showSpinner = true;
        vm.completedArr = [];
        api.getAllAssignedShuttleRequests(vm.date).then(function(response) {
            if (response.status == 200) {
                if (vm.date.getDay() !== vm.dateforInprogress.getDay()) {
                    response.data.forEach(function(item) {
                        item.creationTime += "Z";
                    });
                    vm.completedArr = response.data;
                    vm.showSpinner = false;
                } else {
                    response.data.forEach(function(item) {
                        item.creationTime += "Z";
                        vm.filterByTime(item);
                    });
                    vm.allAssigned = response.data;
                    vm.showSpinner = false;
                }
            }
            timer = $interval(vm.startFilter, 60000);
        })
    }

    api.getAllpendingShuttleRequests().then(function(response) {
        if (response.status == 200) {
            vm.pendingArr = response.data;

            vm.pendingArr.forEach(function(item) {
                item.requestTime += 'Z';
            });
        }
        vm.showSpinner = false;
    })


    api.getAllShuttleDrivers().then(function(response) {
        if (response.status == 200) {
            vm.driversArr = response.data;
        }
    });
    api.getShuttleModels().then(function(response) {
        if (response.status == 200) {
            vm.availShuttls = response.data;
        }
    });

    vm.assign = function(item) {
        if (angular.isUndefined(item.driver)) {
            utils.notify({
                duration: 1000,
                message: 'Please choose driver',
                type: 'warning'
            })
            return;
        } else {
            if (angular.isUndefined(item.number)) {
                utils.notify({
                    duration: 1000,
                    message: 'Please choose car & car number',
                    type: 'warning'
                })
                return;
            } else {
                var objToAssign = {
                    "shuttleRequestId": item.id,
                    "shuttleDriverId": item.driver,
                    "shuttleId": item.number
                };
                item.loading = true;
                api.assignShuttleRequest(objToAssign).then(function(response) {
                    if (response.status == 200) {
                        utils.notify({
                            duration: 1000,
                            message: 'Assign successfull',
                            type: 'success'
                        });
                    }
                })
            }
        }
    }

    mainHub.on('CreateShuttleRequest', function(data) {
        vm.pendingArr.push(data);
        $rootScope.$apply();
    })
    mainHub.on('AssignShuttleRequest', function(innerItem) {
        var item = angular.fromJson(innerItem);
        var newItemFromItem = {
            creationTime: item.CreationTime,
            driverName: item.DriverName,
            id: item.Id,
            phoneNumber: item.PhoneNumber,
            pickUpLocation: item.PickUpLocation,
            requestTime: item.RequestTime,
            shuttleModel: item.ShuttleModel,
            shuttleNumber: item.ShuttleNumber,
            status: item.Status,
            userId: item.UserId,
            userName: item.UserName
        }
        vm.inProgress.push(newItemFromItem);
        utils.delete(vm.pendingArr, item.Id);
        $rootScope.$apply();
    })

    // $scope.$on('addedShuttleRequest', function(ev, item) {
    //     vm.pendingArr.push(item);
    //     $scope.$apply();
    // })

    // $scope.$on('assignShuttleRequest', function(ev, item) {
    //     var newItem = {
    //         creationTime: item.CreationTime,
    //         driverName: item.DriverName,
    //         id: item.Id,
    //         phoneNumber: item.PhoneNumber,
    //         pickUpLocation: item.PickUpLocation,
    //         requestTime: item.RequestTime,
    //         shuttleModel: item.ShuttleModel,
    //         shuttleNumber: item.ShuttleNumber,
    //         status: item.Status,
    //         userId: item.UserId,
    //         userName: item.UserName
    //     }
    //     vm.inProgress.push(newItem);
    //     utils.delete(vm.pendingArr, item.Id);
    //     $scope.$apply();
    // })


    $scope.$watch(function() {
        return vm.date;
    }, function() {
        $timeout(function() {
            vm.getCompleted();
        }, 100)
    });
}