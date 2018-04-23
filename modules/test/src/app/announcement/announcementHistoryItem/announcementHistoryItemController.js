angular
    .module('admin')
    .controller('announcementHistoryItemController', announcementHistoryItemController)


function announcementHistoryItemController(api, $log, id, dataURItoBlob, announcementGroups, moment, securityContext, $state, utils, $interval, $timeout, $document, $scope) {
    var vm = this;
    vm.showSpinner = true;

    if (securityContext.data.permissions.announcement == 'write') {
        vm.showControls = true;
    }

    vm.newMaterial = "";

    vm.dateOptions = {
        format: 'dd-MMMM-yy',
        minDate: new Date(),
        showWeeks: false
    };

    vm.open = function() {
        vm.popup.opened = true;
    };

    vm.popup = {
        opened: false
    };

    vm.announcementGroups = announcementGroups();

    vm.tinymceOptions = {
        plugins: 'textcolor colorpicker ',
        block_formats: 'Paragraph=p;Header 1=h1;Header 2=h2;Header 3=h3; Header 4 = h4; Header 5=h5;Header 6=h6',
        toolbar: 'formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | forecolor',
        height: 300,
        menubar: false,
        statusbar: false,
        readonly: securityContext.data.permissions.events == 'write' ? false : true
    }

    function isEmpty(str) {
        return (!str || 0 === str.length);
    }

    api.getAnnouncement(id).then(function(response) {
        if (response.status == 200) {
            vm.item = response.data;

            if (vm.item.announcementGroup == 0) {
                vm.item.announcementGroup = 1;
            }

            if (!isEmpty(response.data.bannerFileName) && !isEmpty(response.data.previewImageFileName)) {
                api.getFile(response.data.bannerFileName).then(function(response) {
                    vm.item.banner = response;
                });
                api.getFile(response.data.previewImageFileName).then(function(response) {
                    vm.item.previewImage = response;
                });
            }
            vm.announcementGroups.forEach(function(item) {
                if (item.id == vm.item.group) {
                    vm.item.sendTo = item.name;
                }
            });

            vm.showSpinner = false;
            vm.date = moment(vm.item.date, moment.ISO_8601)._d;
        } else {
            utils.notify({
                message: 'Error with downloading the announcement',
                type: 'warning'
            })
        }
    });

    vm.handleFileSelect = function(evt) {
        var file = evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function(evt) {
            $scope.$apply(function() {
                vm.myImage = evt.target.result;
            });
        };
        reader.readAsDataURL(file);
    };

    $timeout(function() {
        angular.element($document.find('#fileInputId')).on('change', vm.handleFileSelect);
    }, 100);



    vm.update = function() {
        if (angular.isUndefined(vm.item.title) || vm.item.title.trim() == "") {
            vm.errName = 'errorName';
            return;
        }
        vm.loading = true;
        vm.errName = '';
        vm.item.date = moment(vm.date).format();

        var waiter = $interval(function() {
            var formData = new FormData();
            if (angular.isUndefined(vm.myCroppedImageBlob) && angular.isDefined(vm.item.banner)) {
                formData.append("ImageState", 0);
            }

            if (angular.isDefined(vm.myCroppedImageBlob)) {
                formData.append("ImageState", 1);
                var blob = dataURItoBlob(vm.myImage);
                formData.append("BannerPath", blob);
                formData.append("PreviewImagePath", vm.myCroppedImageBlob);
            }
            if (angular.isUndefined(vm.item.banner) && angular.isUndefined(vm.myCroppedImageBlob)) {
                formData.append("ImageState", 2);
            }



            formData.append("Id", id);
            formData.append("Title", vm.item.title);
            formData.append("IsDraft", vm.item.isDraft);

            formData.append("ShortDescription", angular.isUndefined(vm.item.shortDescription) ? "" : vm.item.shortDescription);
            formData.append("Description", angular.isUndefined(vm.item.description) ? "" : vm.item.description);
            formData.append("Date", vm.item.date);
            formData.append("AnnouncementGroup", vm.item.announcementGroup);
            formData.append("IsEmergency", vm.item.isEmergency);

            $interval.cancel(waiter);

            api.updateAnnouncement(formData).then(function(response) {
                if (response.status == 200) {
                    $state.go('index.announcement.history');

                    utils.notify({
                        message: 'Announcement updated successfully',
                        type: 'success'
                    })
                } else {
                    utils.notify({
                        message: 'Error with creation of announcement',
                        type: 'warning'
                    })
                }
            })
        }, 1000);
    }

    vm.removeImg = function() {
        delete vm.item.banner;
        delete vm.item.previewImage;
        $timeout(function() {
            angular.element($document.find('#fileInputId')).on('change', vm.handleFileSelect);
        }, 100);
    }

    vm.delete = function() {
        vm.loading = true;
        api.deleteAnnouncement(id).then(function(response) {
            if (response.status == 200) {
                $state.go('index.announcement.history');
            } else {
                utils.notify({
                    message: 'Something going wrong',
                    type: 'warning'
                })
                vm.loading = false;
            }
        })
    }

    $scope.$watch(function() {
        return vm.item;
    }, function() {
        $timeout(function() {
            angular.element($document.find('#fileInputId')).on('change', vm.handleFileSelect);
        }, 100)
    });
}