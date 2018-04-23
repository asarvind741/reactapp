angular
    .module('admin')
    .controller('TransportationController', TransportationController)

function TransportationController(api, utils, $uibModal, $rootScope, $log, $state, broadcastService, webApi, Hub, $scope, securityContext) {
    var vm = this;
    vm.show = false;

    if (securityContext.data.permissions.transportation == 'none') {
        $state.go('permission')
    } else {
        vm.show = true;
    }

    vm.statusMenu = 'closedMenu';
    vm.toggleMenu = function(status) {
        vm.statusMenu = status == 'openedMenu' ? 'closedMenu' : 'openedMenu'
    }


    // var taxiHub = new Hub('taxihub', {
    //     rootPath: webApi['DOMAIN'],
    //     forceWebSocket: true,
    //     autoReconnect: true,
    //     reconnectTimeout: 1000,

    //     listeners: {
    //         CreateTaxiRequest: function(itemInner) {
    //             var item = angular.fromJson(itemInner);
    //             var item2 = {
    //                 adminId: item.AdminId,
    //                 badge: item.Badge,
    //                 comment: item.Comment,
    //                 creationTime: item.CreationTime,
    //                 destination: item.Destination,
    //                 id: item.Id,
    //                 numberOfPassengers: item.NumberOfPassengers,
    //                 phoneNomber: item.PhoneNomber,
    //                 pickUpPoint: item.PickUpPoint,
    //                 requestTime: item.RequestTime,
    //                 requestorName: item.RequestorName,
    //                 status: item.Status,
    //                 arrivalTime: item.ArrivalTime,
    //                 flightNumber: item.FlightNumber
    //             };
    //             broadcastService.send('addedNewRequest', item2);
    //             // $scope.$apply();
    //         },
    //         ApproveTaxiRequest: function(itemInner) {
    //             var item = angular.fromJson(itemInner);
    //             var item2 = {
    //                 adminId: item.AdminId,
    //                 badge: item.Badge,
    //                 comment: item.Comment,
    //                 creationTime: item.CreationTime,
    //                 destination: item.Destination,
    //                 id: item.Id,
    //                 numberOfPassengers: item.NumberOfPassengers,
    //                 phoneNomber: item.PhoneNomber,
    //                 pickUpPoint: item.PickUpPoint,
    //                 requestTime: item.RequestTime,
    //                 requestorName: item.RequestorName,
    //                 status: item.Status,
    //                 arrivalTime: item.ArrivalTime,
    //                 flightNumber: item.FlightNumber
    //             }
    //             broadcastService.send('approveRequestItem', item2);
    //             // $scope.$apply();
    //         },
    //         RejectTaxiRequest: function(id) {
    //             broadcastService.send('rejectRequestItem', id);
    //             // $scope.$apply();

    //         },
    //         AssignTaxiRequest: function(item) {
    //             var item2 = angular.fromJson(item);
    //             broadcastService.send('assignRequestItem', item2);
    //             // $scope.$apply();
    //         },
    //         AvailableTaxiDrivers: function(data) {
    //             broadcastService.send('availDrivers', data);
    //             // $scope.$apply();
    //         },
    //         AvailableTaxiCars: function(data) {
    //             broadcastService.send('availCars', data);
    //             // $scope.$apply();

    //         },
    //         MarkAsComplete: function(id) {
    //             broadcastService.send('markAsComplete', id);
    //             // $scope.$apply();
    //         }
    //     }
    // });

    // $scope.$on('closeTransportationWS', function() {
    //         taxiHub.autoReconnect = false;
    //         taxiHub.stop();

    //         $scope.$apply();

    //     })
    // taxiHub.start().then(function(succsess) {
    //     $log.log(succsess);
    // }, function(error) {
    //     $log.log(error);
    //     utils.notify({
    //         message: 'Error with connection to Websocket',
    //         type: 'error'
    //     })
    // });

}