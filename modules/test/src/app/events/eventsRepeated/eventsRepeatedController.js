angular
    .module('admin')
    .controller('EventsRepeatedController', EventsRepeatedController)

function EventsRepeatedController(api, $log, $scope, $timeout, $filter) {
    var vm = this;
    vm.name = "Repeated";
    vm.showSpinner = true;

    vm.sortField = 'nextDueDate';

    vm.sortBy = function(field) {
        vm.sortField = vm.sortField === field ? '-' + vm.sortField : field;
    };

    vm.parseWhen = function(item) {
        switch (item.repeatEventState) {
            case 0:
                item.whenDate = $filter('date')(item.creationDate, 'dd.MM.yyyy');
                break;
            case 1:
                item.whenDate = $filter('date')(item.creationDate, 'EEEE');
                break;
            case 2:
                item.whenDate = $filter('date')(item.creationDate, "d'th'");
                break;
            case 3:
                item.whenDate = "Every Day";
        }
    }

    api.getAllRepeatedEvents().then(function(response) {
        vm.eventsArr = response.data;
        vm.showSpinner = false;
        vm.eventsArr.forEach(function(item) {
            $filter('nextDueDate')(item);
            vm.parseWhen(item);
        });
    });



}