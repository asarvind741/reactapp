angular.module('admin')
    .directive('spinnerDirective', spinnerDirective)

function spinnerDirective() {
    return {
        restrict: 'E',
        scope: {
            classToSet: '@color'
        },
        templateUrl: 'app/common/directives/spinner/spinnerTemplate.html'
    }
}