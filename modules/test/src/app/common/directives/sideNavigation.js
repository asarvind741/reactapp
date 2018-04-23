angular.module('admin')
    .directive('sideNavigation', sideNavigation)

function sideNavigation() {
    return {
        restrict: 'A',
        link: function() {
            var menuElement = angular.element('#side-menu a:not([href$="\\#"])');
            menuElement.click(function() {
                if (angular.element(window).width() < 769) {
                    angular.element("body").toggleClass("mini-navbar");
                }
            });


        }
    }
}