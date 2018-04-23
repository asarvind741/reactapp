angular
    .module('admin')
    .controller('AnnouncementController', announcementController)


function announcementController(api, $log, $scope, $state, $rootScope, utils, securityContext) {
    var vm = this;
    if (securityContext.status != 200) {
        $state.go('signIn');
    } else {
        if (securityContext.data.permissions.announcement == 'none') {
            $state.go('permission')
        }
    }
    if (securityContext.data.permissions.announcement == 'write') {
        vm.showControls = true;
    }




    vm.statusMenu = 'closedMenu';

    vm.toggleMenu = function(status) {
        if (angular.element(document).width() < 426) {
            vm.statusMenu = status == 'openedMenu' ? 'closedMenu' : 'openedMenu'
        } else {
            vm.statusMenu = 'openedMenu';
        }

    }




}