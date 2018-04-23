angular
    .module('admin')
    .factory('BearerAuthInterceptor', BearerAuthInterceptor)

function BearerAuthInterceptor($window, $q, $injector, $log, adalAuthenticationService, webApi) {
    var inFlightAuthRequest = null;
    return {
        'request': function(config) {
            config.headers = config.headers || {};
            if (sessionStorage.getItem('adal.access.token.key' + webApi['ENDPOINT'])) {
                config.headers.Authorization = 'Bearer ' + sessionStorage.getItem('adal.access.token.key' + webApi['ENDPOINT']);
            }
            return config || $q.when(config);
        },
        'responseError': function(response) {
            switch (response.status) {
                case 401:
                    var deferred = $q.defer();
                    if (!inFlightAuthRequest) {
                        inFlightAuthRequest = adalAuthenticationService.acquireToken(webApi['ENDPOINT']);
                    }
                    inFlightAuthRequest.then(function(r) {
                        inFlightAuthRequest = null;
                        if (r) {
                            sessionStorage.setItem('adal.access.token.key' + webApi['ENDPOINT'], r);
                            // adalAuthenticationService.login();
                            adalAuthenticationService.acquireToken(webApi['CLIENTID']).then(function success(response) {
                                sessionStorage.setItem('adal.access.token.key' + webApi['CLIENTID'], response);
                            });
                            $injector.get("$http")(response.config).then(function(resp) {
                                deferred.resolve(resp);
                            }, function() {
                                deferred.reject();
                            });
                        } else {
                            deferred.reject();
                        }
                    }, function(error) {
                        $log.log(error.status);
                        $log.error('error is: ', error.data);
                        inFlightAuthRequest = null;
                        deferred.reject();
                        // adalAuthenticationService.clearCache();
                        // $injector.get("$state").go('signIn');
                        return;
                    });
                    return deferred.promise;
                case 403:
                    $injector.get("$state").go('permission');
                    break;
            }
            return response || $q.when(response);
        }
    };
}