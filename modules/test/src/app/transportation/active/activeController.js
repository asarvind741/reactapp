angular
    .module('admin')
    .controller('ActiveController', ActiveCtrl)

function ActiveCtrl(api, $log, $interval, $scope, $q, webApi, utils, $rootScope, $filter, securityContext, mainHub) {
    var vm = this;
    if (securityContext.data.permissions.transportation == 'write') {
        vm.showControls = true;
    }

    vm.showSpinner = true;

    $q.all([api.getAllActiveTaxiRequests(), api.getAvailableTaxiCars(), api.getAvailableTaxiDrivers(), api.getInProgress()]).then(function(results) {
        vm.activeArr = $filter('addZtoItemRequestTime')(results[0].data);
        vm.filtered = utils.filterByTime(vm.activeArr);
        vm.availTaxiCars = results[1].data;
        vm.driversArr = results[2].data;
        vm.inProgressArr = $filter('addZtoItemRequestTime')(results[3].data);
        vm.showSpinner = false;
    })

    function filter() {
        vm.filtered = utils.filterByTime(vm.activeArr);
    }

    vm.assign = function(item) {
        var obj = {
            "taxiRequestId": item.id,
            "driverId": item.driver,
            "carId": item.number
        }
        item.loading = true;
        api.assignRequest(obj).then(function(response) {
            if (response.status == 200) {
                utils.notify({
                    message: 'Assign successfull',
                    type: 'success'
                })
            } else {
                utils.notify({
                    message: 'Something going wrong',
                    type: 'error'
                })
                item.loading = false;
            }
        });

    }

    vm.complete = function(item) {
        item.loading = true;
        api.markAsComplete(item.id).then(function(response) {
            if (response.status == 200) {
                utils.notify({
                    message: 'Marked as complete successfull',
                    type: 'success'
                })
            } else {
                utils.notify({
                    message: 'Something going wrong',
                    type: 'error'
                });
            }
        })
    }

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
        filter();
        $rootScope.$apply();
    });

    mainHub.on('AssignTaxiRequest', function(itemInner) {
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
            carModel: item.CarModel,
            carNumber: item.CarNumber,
            driverName: item.DriverName,
            arrivalTime: item.ArrivalTime,
            flightNumber: item.FlightNumber
        }
        item2.requestTime += 'Z';
        utils.delete(vm.activeArr, item2.id);
        filter();
        vm.inProgressArr.push(item2);
        $rootScope.$apply();
    });

    mainHub.on('AvailableTaxiDrivers', function(data) {
        vm.driversArr = data;
        $rootScope.$apply();
    });

    mainHub.on('AvailableTaxiCars', function(array) {
        vm.availTaxiCars = array;
        $rootScope.$apply();
    });

    mainHub.on('MarkAsComplete', function(id) {
        utils.delete(vm.inProgressArr, id);
        utils.delete(vm.activeArr, id);
        filter();
        $rootScope.$apply();
    });

    var deregistrationCallback = $rootScope.$on('syncFilterArr', function() {
        filter();
    })

    $rootScope.$on('$destroy', deregistrationCallback);
}