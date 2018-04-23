angular
    .module('admin')
    .controller('FeedbackController', FeedbackController)

function FeedbackController(api, $log, $scope, $state, $rootScope, utils, $uibModal, securityContext, checkService) {
    var vm = this;
    if (securityContext.status != 200) {
        $state.go('signIn');
    } else {
        if (securityContext.data.permissions.feedback == 'none') {
            $state.go('permission')
        }
    }
    if (securityContext.data.permissions.feedback == 'write') {
        vm.showControls = true;
    }

    vm.search = "";
    vm.newCategory = false;

    api.getFeedbackCategories().then(function(response) {
        if (response.status == 200) {
            vm.categoryArr = response.data;
        }
    });

    vm.save = function(item) {
        api.updateFeedbackCategories(item).then(function(response) {
            if (response.status == 200) {
                utils.notify({
                    message: 'Update category successfull',
                    type: 'success'
                })
            }
        })
    }

    vm.delete = function(item) {
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/confirm/template.html',
            controller: 'ConfirmController as ConfirmCtrl',
            size: 'sm'
        });
        modalInstance.result.then(function(result) {
            if (!result) return;
            api.deleteFeedbackCategories(item.id).then(function(response) {
                if (response.status == 200) {
                    utils.delete(vm.categoryArr, item.id);
                    utils.notify({
                        message: 'Delete category successfull',
                        type: 'success'
                    })
                }
            })
        })
    }

    vm.checkName = function(id, name) {
        return checkService.checkNameWithDublicate(id, name, vm.categoryArr);
    }

    vm.checkEmail = function(data) {
        return checkService.checkEmail(data);

    }



    vm.add = function(item) {
        if (!vm.checkName(0, angular.isUndefined(item) ? undefined : item.name) || !vm.checkEmail(item.email)) {
            return;
        }
        api.createFeedbackCategories(item).then(function(success) {
            vm.categoryArr.push(success.data);
            utils.notify({
                message: 'Add category successfull',
                type: 'success'
            })
            vm.newCategoryObj = "";
            vm.newCategory = false;
        })
    }


}