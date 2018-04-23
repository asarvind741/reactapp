(function() {
    'use strict';
    angular
        .module('admin')
        .config(routerConfig)
        .config(Provide)
        .config(adalConfig)
        .config(httpProviderConfig)
        .config(tinyMCEConfig)

    /** @ngInject */



    function routerConfig($stateProvider, $locationProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('signIn');

        $stateProvider
            .state('signIn', {
                url: "/signIn",
                templateUrl: "app/login/loginPage.template.html",
                controller: 'LoginController as loginCtrl'
            })
            .state('index', {
                abstract: true,
                url: "",
                templateUrl: "app/navigation/content.html",
                controller: 'ContentController as contentCtrl',
                resolve: {
                    securityContext: function(api) {
                        return api.getUserInfo();
                    }
                },
                requireADLogin: true
            })
            .state('permission', {
                url: '/permission',
                templateUrl: 'app/permission/permission.template.html',
                controller: "PermissionController",
                controllerAs: "permissionCtrl"
            })
            .state('index.transportation', {
                url: "/transportation",
                templateUrl: "app/transportation/transportationMain/transportation.template.html",
                controller: "TransportationController as transportationCtrl"
            })
            .state('index.transportation.pending', {
                url: "/pending",
                templateUrl: "app/transportation/pending/pending.template.html",
                controller: 'PendingController as pendingCtrl'
            })
            .state('index.transportation.active', {
                url: "/active",
                templateUrl: "app/transportation/active/active.template.html",
                controller: 'ActiveController as activeCtrl'
            })
            .state('index.transportation.destinations', {
                url: "/destinations",
                templateUrl: "app/transportation/destinations/destinations.template.html",
                controller: 'DestinationsController as destinationsCtrl'
            })
            .state('index.transportation.history', {
                url: "/history",
                templateUrl: "app/transportation/history/history.template.html",
                controller: 'HistoryController as historyCtrl'
            })
            .state('index.transportation.cars', {
                url: "/cars",
                templateUrl: "app/transportation/cars/cars.template.html",
                controller: 'CarsController as carsCtrl'
            })
            .state('index.transportation.cars.numbers', {
                url: "/numbers/{{itemID}}",
                templateUrl: "app/transportation/carsNumbers/carsNumber.template.html",
                controller: 'CarsNumbersController as carsNumberCtrl',
                resolve: {
                    id: function($stateParams) {
                        return $stateParams.itemID;
                    }
                }
            })
            .state('index.transportation.drivers', {
                url: "/drivers",
                templateUrl: "app/transportation/drivers/drivers.template.html",
                controller: 'DriverController as driversCtrl'
            })
            .state('index.announcement', {
                url: "/announcement",
                templateUrl: "app/announcement/announcementMain/announcement.template.html",
                controller: 'AnnouncementController as announcementCtrl'
            })
            .state('index.announcement.drafts', {
                url: "/drafts",
                templateUrl: "app/announcement/announcementDrafts/announcementDrafts.template.html",
                controller: 'AnnouncementDraftsController as announcementDraftsCtrl'
            })
            .state('index.announcement.draftsItem', {
                url: "/drafts/{draftsItemID}",
                templateUrl: "app/announcement/announcementDraftItem/announcementDraftItem.template.html",
                controller: 'AnnouncementDraftItemController as announcementDraftItemCtrl',
                resolve: {
                    id: function($stateParams) {
                        return $stateParams.draftsItemID;
                    }
                }
            })
            .state('index.announcement.item', {
                url: '/item/{itemID}',
                templateUrl: "app/announcement/announcementItem/announcementItem.template.html",
                controller: 'AnnouncementItemController as announcementItemCtrl',
                resolve: {
                    id: function($stateParams) {
                        return $stateParams.itemID;
                    }
                }
            })
            .state('index.announcement.history', {
                url: "/history",
                templateUrl: "app/announcement/announcementHistory/announcementHistory.template.html",
                controller: 'AnnouncementHistoryController as announcementHistoryCtrl'
            })
            .state('index.announcement.historyItem', {
                url: '/history/{historyItemID}',
                templateUrl: "app/announcement/announcementHistoryItem/announcementHistoryItem.template.html",
                controller: 'announcementHistoryItemController as announcementHistoryItemCtrl',
                resolve: {
                    id: function($stateParams) {
                        return $stateParams.historyItemID;
                    }
                }
            })
            .state('index.feedback', {
                url: '/feedback',
                templateUrl: "app/feedback/feedback.template.html",
                controller: 'FeedbackController as FeedbackCtrl'
            })
            .state('index.shuttle', {
                url: '/shuttle',
                templateUrl: "app/shuttle/shuttleMain/shuttle.template.html",
                controller: 'ShuttleController as shuttleCtrl'
            })
            .state('index.shuttle.schedule', {
                url: '/schedule',
                templateUrl: "app/shuttle/schedule/shuttleSchedule.template.html",
                controller: 'ShuttleScheduleController as scheduleCtrl'
            })
            .state('index.shuttle.requests', {
                url: '/requests',
                templateUrl: "app/shuttle/requests/shuttleRequests.template.html",
                controller: 'ShuttleRequestsController as requestsCtrl'
            })
            .state('index.shuttle.destinations', {
                url: '/destinations',
                templateUrl: "app/shuttle/destinations/shuttleDestinations.template.html",
                controller: 'ShuttleDestinationsController as shuttleDestinationsCtrl'
            })
            .state('index.shuttle.drivers', {
                url: '/drivers',
                templateUrl: "app/shuttle/drivers/shuttleDrivers.template.html",
                controller: 'ShuttleDriversController as driversCtrl'
            })
            .state('index.shuttle.shuttles', {
                url: '/shuttles',
                templateUrl: "app/shuttle/shuttles/shuttleCars.template.html",
                controller: 'ShuttleCarsController as shuttlesCtrl'
            })
            .state('index.shuttle.shuttles.numbers', {
                url: "/numbers/{{itemID}}",
                templateUrl: "app/shuttle/shuttlesNumber/shuttleCarsNumber.template.html",
                controller: 'ShuttleCarsNumbersController as shuttlesNumberCtrl',
                resolve: {
                    id: function($stateParams) {
                        return $stateParams.itemID;
                    }
                }
            })
            .state('index.events', {
                url: "/events",
                templateUrl: "app/events/eventsMain/events.template.html",
                controller: 'EventsController as eventsCtrl'
            })
            .state('index.events.item', {
                url: '/item/{itemID}',
                templateUrl: "app/events/eventsItem/eventsItem.template.html",
                controller: 'EventsItemController as eventsItemCtrl',
                resolve: {
                    id: function($stateParams) {
                        return $stateParams.itemID;
                    }
                }
            })
            .state('index.events.schedule', {
                url: "/schedule",
                templateUrl: "app/events/eventsSchedule/eventsSchedule.template.html",
                controller: 'EventsScheduleController as eventsScheduleCtrl'
            })
            .state('index.events.repeated', {
                url: '/repeated',
                templateUrl: "app/events/eventsRepeated/eventsRepeated.template.html",
                controller: 'EventsRepeatedController as eventsRepeatedCtrl'
            })
            .state('index.events.history', {
                url: '/history',
                templateUrl: "app/events/eventsHistory/eventsHistory.template.html",
                controller: 'EventsHistoryController as eventsHistoryCtrl'
            })
            .state('index.events.historyitem', {
                url: '/historyitem/{historyItemID}',
                templateUrl: "app/events/eventsHistoryItem/eventsHistoryItem.template.html",
                controller: 'EventHistoryItemController as eventHistoryItemCtrl',
                resolve: {
                    id: function($stateParams) {
                        return $stateParams.historyItemID;
                    }
                }
            })

    }

    function Provide($provide) {
        $provide.decorator('$http', ["$delegate", "$q", function($delegate, $q) {
            var getFn = $delegate.get;
            var cancelerMap = {};

            function getCancelerKey(method, url) {
                var formattedMethod = method.toLowerCase();
                var formattedUrl = encodeURI(url).toLowerCase().split("?")[0];
                return formattedMethod + "~" + formattedUrl;
            }

            $delegate.get = function() {
                var cancelerKey, canceler, method;
                var args = [].slice.call(arguments);
                var url = args[0];
                var config = args[1] || {};
                if (config.timeout == null) {
                    method = "GET";
                    cancelerKey = getCancelerKey(method, url);
                    canceler = $q.defer();
                    cancelerMap[cancelerKey] = canceler;
                    config.timeout = canceler.promise;
                    args[1] = config;
                }
                return getFn.apply(null, args);
            };

            $delegate.abort = function(request) {
                var cancelerKey, canceler;
                cancelerKey = getCancelerKey(request.method, request.url);
                canceler = cancelerMap[cancelerKey];

                if (canceler != null) {
                    if (request.timeout != null && typeof !angular.isNumber(request.timeout)) {
                        canceler.resolve();
                        delete cancelerMap[cancelerKey];
                    }
                }
            };

            return $delegate;
        }]);
    }

    function adalConfig(adalAuthenticationServiceProvider, $httpProvider, webApi) {
        // Logging = {
        //     level: 3,
        //     log: function(message) {
        //         console.log(message);
        //     },
        //     piiLoggingEnabled: true
        // };
        var endpoints = {};
        var key = webApi['DOMAIN'];
        var value = webApi['ENDPOINT'];
        endpoints[key] = value;


        adalAuthenticationServiceProvider.init({
                instance: 'https://login.microsoftonline.com/',
                tenant: webApi['TENANT'],
                clientId: webApi['CLIENTID'],
                endpoints: endpoints,
                anonymousEndpoints: ['/sigin'],
                expireOffsetSeconds: 600,
                postLogoutRedirectUri: webApi['POSTLOGOUTREDIRECTURL'],
                redirectUri: window.location.href,
                loadFrameTimeout: 60000
            },
            $httpProvider
        );
    }

    function httpProviderConfig($locationProvider, $httpProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        }).hashPrefix('!');

        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.interceptors.push('BearerAuthInterceptor');
        $httpProvider.interceptors.push('ProtectedResourceInterceptor');
        // $httpProvider.interceptors.push('ErrorInterceptor');
    }

    function tinyMCEConfig() {
        //commit if you want to run local
        //uncommit if you build for deploy on azure
        //tinyMCE.baseURL = './../assets/tinymce';
        tinyMCE.suffix = '.min';
    }
})();