angular
    .module('admin')
    .controller('PermissionController', PermissionController)

function PermissionController(adalAuthenticationService) {
    var vm = this;

    vm.logout = function() {
        sessionStorage.clear();
        adalAuthenticationService.logOut();
    };

}