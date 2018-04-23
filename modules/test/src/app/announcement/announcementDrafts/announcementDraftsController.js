angular
    .module('admin')
    .controller('AnnouncementDraftsController', AnnouncementDraftsController)

function AnnouncementDraftsController(api, $scope, $timeout, moment, securityContext, utils, announcementGroups) {
    var vm = this;
    vm.name = "Drafts";
    vm.showControls = securityContext.data.permissions.announcement == 'write' ? true : false;
    vm.showSpinner = true;


    vm.announcementGroups = announcementGroups();




    api.getDrafts().then(function(response) {
        if (response.status == 200) {
            vm.arr = response.data;
            vm.showSpinner = false;
        } else {
            vm.arr = [];
            vm.showSpinner = false;
        }
    })

    vm.sortField = 'title';
    vm.sortBy = function(field) {
        vm.sortField = vm.sortField === field ? '-' + vm.sortField : field;
    };

    vm.delete = function(item) {
        item.loading = true;
        api.deleteAnnouncement(item.id).then(function(response) {
            if (response.status == 200) {
                utils.notify({
                    message: 'Draft delete successfull',
                    type: 'success'
                })
                vm.loading = false;
                utils.delete(vm.arr, item.id);
            } else {
                utils.notify({
                    message: 'Something going wrong',
                    type: 'warning'
                })
                vm.loading = false;
            }
        })
    }
}