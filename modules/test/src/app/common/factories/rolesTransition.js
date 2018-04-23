function rolesTransition($state, userInformation) {
    return {
        redirectTo: _redirectTo
    }

    function _redirectTo() {
        var access = userInformation.getData();
        console.log("here access", access);
        if (access.permissions.transportation != 'none') {
            return $state.go('index.transportation.pending')
        } else

        if (access.permissions.announcement != 'none') {
            return $state.go('index.announcement');
        }
    }
}
angular
    .module('admin')
    .factory('rolesTransition', rolesTransition)