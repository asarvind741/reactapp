function ModalRejectController($uibModalInstance, $scope) {
    var vm = this;

    var minimalTime = new Date();
    vm.minTime = minimalTime.setMinutes(minimalTime.getMinutes() + 2);
    vm.date = vm.minTime;
    vm.dateOptions = {
        format: 'yy',
        minDate: new Date(),
        showWeeks: false
    };
    vm.open = function() {
        vm.popup.opened = true;
    };

    vm.popup = {
        opened: false
    };


    vm.ok = function(date) {
        $uibModalInstance.close(date);
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
    .controller('ModalRejectController', ModalRejectController)