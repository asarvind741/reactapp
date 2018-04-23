angular
    .module('admin')
    .controller('ConfirmController', confirmController);

function confirmController($uibModalInstance, $scope) {
    var vm = this;
    vm.cancel = function() {
        $uibModalInstance.close(false);
    };

    vm.ok = function() {
        $uibModalInstance.close(true);
    }

    $scope.$on('modal.closing', function(event, reason) {
        if (reason == "backdrop click" || reason == "escape key press") {
            event.preventDefault();
            $uibModalInstance.close(false);
        }
    });
}

confirmController.$inject = [
    '$uibModalInstance', '$scope'
]