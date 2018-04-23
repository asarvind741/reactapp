function modalDelDestinationController($uibModalInstance, item, $scope) {
    var vm = this;
    vm.item = item;


    vm.ok = function(item) {
        $uibModalInstance.close(item);
    };

    vm.cancel = function() {
        $uibModalInstance.close(false);
    };
    $scope.$on('modal.closing', function(event, reason) {
        if (reason == "backdrop click" || reason == "escape key press") {
            event.preventDefault();
            $uibModalInstance.close(false);
        }
    });
}
angular
    .module('admin')
    .controller('modalDelDestinationController', modalDelDestinationController)