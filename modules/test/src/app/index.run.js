(function() {
    'use strict';

    angular
        .module('admin')
        .run(runBlock)

    /** @ngInject */
    function runBlock(editableOptions, $rootScope, adalAuthenticationService, broadcastService, $state, $http, $log) {

        editableOptions.theme = 'bs3';
        var root = $rootScope;

        root.$on('adal:acquireTokenFailure', function() {
            adalAuthenticationService.login();
        });

        root.$on('$stateChangeStart', function(event, toState, toParams, fromState) {

            if (!adalAuthenticationService.userInfo.isAuthenticated && (toState.name != 'signIn')) {
                $log.log('Not auth');
            }
            if ((fromState.name.indexOf('transportation') >= 0) && toState.name.indexOf('transportation') == -1) {
                broadcastService.send('closeTransportationWS', 'close');
            }
            if (fromState.name === "") {
                if (angular.element(document).width() < 769) {
                    angular.element('body').addClass('body-small')
                } else {
                    angular.element('body').removeClass('body-small')
                }
            }
            if ((fromState.name.indexOf('shuttle') >= 0) && toState.name.indexOf('shuttle') == -1) {
                broadcastService.send('closeShuttleWS', 'close');
            }
            if ((fromState.name != "signIn") && (toState.name != 'signIn') && (toState.name.indexOf(fromState.name) == -1)) {
                angular.forEach($http.pendingRequests, function(request) {
                    $http.abort(request);
                });
            }
        });
    }
})();