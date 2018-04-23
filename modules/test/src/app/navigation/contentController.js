angular
    .module('admin')
    .controller('ContentController', contentController)


function contentController(api, $log, $q, $rootScope, $scope, $uibModal, $location, securityContext, $state, utils, adalAuthenticationService, broadcastService, $timeout, mainHub, $interval, $filter) {
    var vm = this;

    if (securityContext.status == 401) {
        $state.go('signIn');
    } else {
        vm.access = securityContext.data.permissions;
        vm.user = securityContext.data;
    }

    vm.skin = "skin-3";

    vm.class = ['', '', '', '', ''];

    vm.setActive = function(index) {
        vm.class.forEach(function(item, i, arr) {
            (i != index) ? arr[i] = '': arr[i] = 'activated';
        })
    }

    vm.locPaths = ['/transportation', '/announcement', '/feedback', '/shuttle', '/events'];

    vm.locPaths.forEach(function(item, i) {
        if ($state.$current.url.source.indexOf(item) != -1) {
            vm.setActive(i);
        }
    });



    vm.logout = function() {
        sessionStorage.clear();
        $state.go('signIn', {}, { location: true, inherit: false, reload: true }).then(function() {
            $timeout(function() {
                adalAuthenticationService.logOut();
            }, 200)
        });
    };

    if (vm.access.shuttle != 'none' && vm.access.transportation != 'none') {
        mainHub.start().then(function() {
                $q.all([api.getAllPendingTaxiRequests(), api.getAllActiveTaxiRequests(), api.getAllpendingShuttleRequests()]).then(function(results) {
                    vm.taxiCounter = results[0].data.length;
                    vm.activeArr = $filter('addZtoItemRequestTime')(results[1].data);
                    vm.filtered = utils.filterByTime(vm.activeArr);
                    vm.thirthyMinCounter = vm.filtered.thirtyMinArr.length;
                    vm.expiredCounter = vm.filtered.previousArr.length;
                    vm.shuttleCounter = results[2].data.length;

                })
            },
            function(error) {
                $log.log(error);
                utils.notify({
                    message: 'Error with connection to Websocket',
                    type: 'error'
                })
            });
    }

    var waiter = $interval(function() {
        filter();
    }, 30000);

    function filter() {
        vm.filtered = utils.filterByTime(vm.activeArr);
        vm.thirthyMinCounter = vm.filtered.thirtyMinArr.length;
        vm.expiredCounter = vm.filtered.previousArr.length;
        broadcastService.send('syncFilterArr', vm.filtered);
    }

    mainHub.on('CreateTaxiRequest', function() {
        vm.taxiCounter += 1;
        $rootScope.$apply();
    });

    mainHub.on('ApproveTaxiRequest', function(itemInner) {
        var item = angular.fromJson(itemInner);
        var item2 = {
            adminId: item.AdminId,
            badge: item.Badge,
            comment: item.Comment,
            creationTime: item.CreationTime,
            destination: item.Destination,
            id: item.Id,
            numberOfPassengers: item.NumberOfPassengers,
            phoneNomber: item.PhoneNomber,
            pickUpPoint: item.PickUpPoint,
            requestTime: item.RequestTime,
            requestorName: item.RequestorName,
            status: item.Status,
            arrivalTime: item.ArrivalTime,
            flightNumber: item.FlightNumber
        }
        item2.requestTime += 'Z';
        vm.activeArr.push(item2);
        vm.taxiCounter -= 1;
        filter();
        $rootScope.$apply();
    });

    mainHub.on('RejectTaxiRequest', function() {
        vm.taxiCounter -= 1;
        $rootScope.$apply();
    });

    mainHub.on('AssignTaxiRequest', function(item) {
        utils.delete(vm.activeArr, angular.fromJson(item).Id);
        filter();
        $rootScope.$apply();
    });

    mainHub.on('MarkAsComplete', function(id) {
        utils.delete(vm.activeArr, id);
        filter();
        $rootScope.$apply();
    });

    mainHub.on('CreateShuttleRequest', function() {
        vm.shuttleCounter += 1;
        $rootScope.$apply();
    });
    mainHub.on('AssignShuttleRequest', function() {
        vm.shuttleCounter -= 1;
        $rootScope.$apply();
    });

    $scope.$on("$destroy", function() {
        if (waiter) {
            $interval.cancel(waiter);
        }
    });
}