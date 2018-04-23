 function broadcastService($rootScope) {
     return {
         send: function(msg, data) {
             $rootScope.$broadcast(msg, data);
         }
     }
 }

 angular
     .module('admin')
     .factory('broadcastService', broadcastService)