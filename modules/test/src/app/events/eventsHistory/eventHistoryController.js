angular
    .module('admin')
    .controller('EventsHistoryController', EventsHistoryController)

function EventsHistoryController(api, $log, $scope, $timeout) {
    var vm = this;
    vm.name = "History";
    vm.showSpinner = true;
    vm.spinnerClass = 'm-t-xll';

    vm.sortField = 'dateOfEvent';
    vm.sortBy = function(field) {
        vm.sortField = vm.sortField === field ? '-' + vm.sortField : field;
    };

    vm.dateOptions = {
        minMode: 'month',
        maxDate: new Date()
    };
    vm.date = new Date();

    // vm.today = new Date();

    vm.open = function() {
        vm.popup.opened = true;
    };

    vm.popup = {
        opened: false
    };

    vm.showAll = function() {
        api.getEventHistory(vm.date).then(function(response) {
            vm.showSpinner = false;
            if (response.status == 200) {
                vm.eventsArr = response.data;
            }
        });

    }

    $scope.$watch(function() {
        return vm.date;
    }, function() {
        $timeout(function() {
            vm.showSpinner = true;
            vm.showAll();
        }, 100)
    });
}