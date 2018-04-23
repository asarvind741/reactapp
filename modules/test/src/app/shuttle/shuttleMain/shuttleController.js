angular
    .module('admin')
    .controller('ShuttleController', ShuttleController)

function ShuttleController(api, utils, $uibModal, $state, broadcastService, webApi, $scope, Hub, $log, securityContext) {
    var vm = this;
    if (securityContext.data.permissions.shuttle == 'none') {
        $state.go('permission')
    } else {
        vm.show = true;
        if (securityContext.data.permissions.shuttle == 'write') {
            vm.showControls = true;
        }
    }

    vm.statusMenu = 'closedMenu';
    vm.toggleMenu = function(status) {
        vm.statusMenu = status == 'openedMenu' ? 'closedMenu' : 'openedMenu'

    }

    // var myHub = new Hub('shuttlehub', {
    //     rootPath: webApi['DOMAIN'],
    //     forceWebSocket: true,
    //     autoReconnect: false,
    //     reconnectTimeout: 1000,
    //     listeners: {
    //         CreateShuttleRequest: function(success) {
    //             broadcastService.send('addedShuttleRequest', success);
    //         },
    //         AssignShuttleRequest: function(success) {
    //             broadcastService.send('assignShuttleRequest', angular.fromJson(success));
    //         }
    //     }
    // });

    // $scope.$on('closeShuttleWS', function() {
    //     myHub.autoReconnect = false;
    //     myHub.stop();

    //     $scope.$apply();

    // })

    // myHub.start().then(function(succsess) {
    //     $log.log(succsess);
    // }, function(error) {
    //     $log.log(error);
    //     utils.notify({
    //         message: 'Error with connection to Websocket',
    //         type: 'error'
    //     })
    // });

}