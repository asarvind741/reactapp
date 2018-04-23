function PendingCtrl(api, utils, $uibModal, $log, webApi, $scope, securityContext, mainHub, $rootScope) {
    var vm = this;
    vm.pendingArr = [];
    vm.showSpinner = true;

    if (securityContext.data.permissions.transportation == 'write') {
        vm.showControls = true;
    }
    api.getAllPendingTaxiRequests().then(function(success) {
        if (angular.isArray(success.data)) {
            vm.pendingArr = success.data;
            vm.pendingArr.forEach(function(item) {
                item.requestTime += 'Z';
            });
        } else { vm.pendingArr = []; }
        vm.showSpinner = false;
    }, function() {
        vm.pendingArr = [];
    });


    vm.approve = function(item) {
        item.loading = true;
        api.approveTaxiRequest(item.id);
    }

    vm.reject = function(item) {

        item.loading = true;
        vm.modalInstance = $uibModal.open({
            templateUrl: 'app/transportation/modals/modalReject.html',
            controller: 'ModalRejectController as modalInstanceCtrl'
        });
        vm.modalInstance.result.then(function(result) {
            if (!result) {
                item.loading = false;
                return;
            }
            var obj = {
                id: item.id,
                newTime: utils.convertToUTC(result)
            }
            api.rejectTaxiRequest(obj);
            item.loading = false;
        });
    }

    mainHub.on('CreateTaxiRequest', function(itemInner) {
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
        };
        vm.pendingArr.push(item2);
        $rootScope.$apply();
    });

    mainHub.on('ApproveTaxiRequest', function(item) {
        utils.delete(vm.pendingArr, angular.fromJson(item).Id);
        $rootScope.$apply();
    });

    mainHub.on('RejectTaxiRequest', function(item) {
        utils.delete(vm.pendingArr, angular.fromJson(item).Id);
        $rootScope.$apply();
    });
}

angular
    .module('admin')
    .controller('PendingController', PendingCtrl)