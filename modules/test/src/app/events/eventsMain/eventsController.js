angular
    .module('admin')
    .controller('EventsController', EventsController)


function EventsController(api, $log, $scope, $state, $rootScope, utils, securityContext) {
    var vm = this;
    vm.showSpinner = true;
    if (securityContext.status != 200) {
        $state.go('signIn');
    } else {
        if (securityContext.data.permissions.events == 'none') {
            $state.go('permission')
        }
    }
    if (securityContext.data.permissions.events == 'write') {
        vm.showControls = true;
    }

    vm.draftsArr = [];
    api.getAllDraftsEvents().then(function(response) {
        if (response.status === 200) {
            vm.showSpinner = false;
            vm.draftsArr = response.data;
        }
    })


    vm.statusMenu = 'closedMenu';
    vm.toggleMenu = function(status) {
        if (status == 'openedMenu') {
            vm.statusMenu = 'closedMenu'
        } else {
            vm.statusMenu = 'openedMenu'
        }
    }

    $scope.$on('arrEventChanged:Add', function(ev, array) {
        vm.draftsArr = array;
    })

    $scope.$on('arrEventChanged:Del', function(ev, id) {
        utils.delete(vm.draftsArr, id);
    })

    $scope.$on('arrEventChanged:Upd', function() {
        api.getAllDraftsEvents().then(function(success) {
            vm.draftsArr = success.data;
        })
    })


}