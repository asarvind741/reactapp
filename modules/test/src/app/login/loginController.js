angular
    .module('admin')
    .controller('LoginController', LoginController)

function LoginController(api, $log, utils, $state, rolesTransition, adalAuthenticationService, webApi, $scope, userInformation) {
    var vm = this;
    vm.isAuthenticated = adalAuthenticationService.userInfo.isAuthenticated;

    if (adalAuthenticationService.userInfo.isAuthenticated) {
        adalAuthenticationService.acquireToken(webApi['ENDPOINT']).then(function(success) {
                sessionStorage.setItem('adal.access.token.key' + webApi['ENDPOINT'], success);

                console.log('session', sessionStorage.getItem('adal.access.token.key'));
                if (!userInformation.getData()) {
                    api.getUserInfo().then(function(response) {
                        
                        if (response.status === 200) {
                            userInformation.setData(response.data);
                            console.log("response", JSON.stringify(response.data));
                            rolesTransition.redirectTo();
                        } else {
                            if (response.status == -1) {
                                utils.notify({
                                    message: 'Sign-in with other credentials',
                                    type: 'error'
                                })
                                sessionStorage.clear();
                                adalAuthenticationService.logOut();
                            }
                        }
                    })
                }
            },
            function(error) {
                $log.log(error);
                sessionStorage.clear();
                adalAuthenticationService.logOut();
            }
        )
    }
    vm.login = function() {
        adalAuthenticationService.login();
    }

}