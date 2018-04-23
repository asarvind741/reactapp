angular
    .module('admin')
    .factory('mainHub', mainHub)

function mainHub(Hub, webApi) {

    var hub = new Hub('kapsarchub', {
        rootPath: webApi['DOMAIN'],
        forceWebSocket: true,
        autoReconnect: true,
        reconnectTimeout: 1000

    });

    return hub;
}