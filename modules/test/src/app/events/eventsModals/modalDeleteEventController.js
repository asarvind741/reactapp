function modalDeleteEvent($uibModalInstance, item, $scope) {
    var vm = this;
    vm.item = item;


    vm.deleteGroups = [{
            id: 1,
            name: 'Only this date'
        },
        {
            id: 2,
            name: 'All eventual dates'
        }
    ]

    if (item.isInDraft) {
        vm.showMsgDraft = true;
    } else {
        if (item.repeatEventState != 0) {
            vm.showMsgRepeat = true;
        } else {
            if (item.repeatEventState == 0) {
                vm.showMsgNoRepeat = true;
            }
        }
    }

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
    .controller('modalDeleteEventController', modalDeleteEvent)