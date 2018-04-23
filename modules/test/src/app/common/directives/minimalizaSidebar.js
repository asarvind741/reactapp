angular.module('admin')
    .directive('minimalizaSidebar', minimalizaSidebar)

function minimalizaSidebar($timeout) {
    return {
        restrict: 'A',
        template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-menu " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
        controller: function($scope) {
            $scope.minimalize = function() {
                angular.element('body').toggleClass('mini-navbar');
                if (!angular.element('body').hasClass('mini-navbar') || angular.element('body').hasClass('body-small')) {
                    angular.element('#side-menu').hide();
                    $timeout(function() {
                        angular.element('#side-menu').fadeIn(400);
                    }, 200);
                } else {
                    angular.element('#side-menu').removeAttr('style');
                }
            };
        }
    }
}