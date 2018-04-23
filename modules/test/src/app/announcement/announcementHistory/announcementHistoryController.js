angular
    .module('admin')
    .controller('AnnouncementHistoryController', AnnouncementHistoryController)

function AnnouncementHistoryController(api, $scope, $timeout, moment, announcementGroups) {
    var vm = this;
    vm.name = "History";

    vm.dateOptions = {
        minMode: 'month'
    };
    vm.date = new Date();

    vm.open = function() {
        vm.popup.opened = true;
    };

    vm.popup = {
        opened: false
    };
    vm.showSpinner = true;

    vm.showAll = function() {
        vm.showSpinner = true;
        var startDate = moment(vm.date).startOf('month')._d;
        var endDate = moment(vm.date).endOf('month')._d;
        vm.announcementGroups = announcementGroups();


        api.getAnnouncementHistory(startDate, endDate).then(function(response) {
            if (response.status == 200) {
                response.data.forEach(function(item) {
                    if (item.group == 0) {
                        item.group = 1;
                    }
                    vm.announcementGroups.forEach(function(group) {
                        if (group.id == item.group) {
                            item.group = group.name;
                        }
                    })
                });
                vm.arr = response.data;
                vm.showSpinner = false;
            } else {
                vm.arr = [];
                vm.showSpinner = false;
            }
        });


    }

    vm.sortField = 'creationDate';
    vm.sortBy = function(field) {
        vm.sortField = vm.sortField === field ? '-' + vm.sortField : field;
    };

    $scope.$watch(function() {
        return vm.date;
    }, function() {
        $timeout(function() {
            vm.showAll();
        }, 100)
    });
}