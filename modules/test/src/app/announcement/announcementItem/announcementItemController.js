angular
    .module('admin')
    .controller('AnnouncementItemController', AnnouncementItemController)

function AnnouncementItemController(api, $log, id, dataURItoBlob, announcementGroups, $scope, $state, FileUploader, utils, securityContext, moment, $document, $interval, $timeout) {
    var vm = this;
    vm.showSpinner = true;

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


    vm.dateOptions = {
        format: 'dd-MMMM-yy',
        minDate: new Date(),
        showWeeks: false
    };
    vm.popup = {
        opened: false
    };
    vm.open = function() {
        vm.popup.opened = true;
    };



    if (id != 0) {
        $state.go('index.announcement');
    } else {
        vm.showEditButtons = false;
        vm.showControls = securityContext.data.permissions.announcement == 'write' ? true : false;
        vm.item = {
            announcementGroup: 1,
            isEmergency: false
        }
        vm.date = new Date();
        vm.showSpinner = false;
    }


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




    vm.save = function() {
        if (angular.isUndefined(vm.item.title) || vm.item.title.trim() == "") {
            vm.errName = 'errorName';
            utils.notify({
                message: 'Enter Title',
                type: 'warning'
            });
            return;
        }
        vm.loading = true;
        vm.errName = '';

        vm.item.date = moment(vm.date).format();
        vm.item.isDraft = true;

        var waiter = $interval(function() {
            var formData = new FormData();


            if (angular.isUndefined(vm.myCroppedImageBlob) && angular.isDefined(vm.item.banerURL)) {
                formData.append("ImageState", 0);
            }

            if (angular.isDefined(vm.myCroppedImageBlob)) {
                formData.append("ImageState", 1);
                var blob = dataURItoBlob(vm.myImage);
                formData.append("BannerPath", blob);
                formData.append("PreviewImagePath", vm.myCroppedImageBlob);
            }
            if (angular.isUndefined(vm.item.banerURL) && angular.isUndefined(vm.myCroppedImageBlob)) {
                formData.append("ImageState", 2);
            }



            formData.append("Date", vm.item.date);
            formData.append("IsEmergency", vm.item.isEmergency);
            formData.append("IsDraft", vm.item.isDraft);
            formData.append("AnnouncementGroup", vm.item.announcementGroup);
            formData.append('Title', vm.item.title);

            formData.append("ShortDescription", angular.isUndefined(vm.item.shortDescription) ? "" : vm.item.shortDescription);
            formData.append("Description", angular.isUndefined(vm.item.description) ? "" : vm.item.description);


            $interval.cancel(waiter);

            api.createDraft(formData).then(function(response) {
                if (response.status == 200) {
                    api.getDrafts().then(function(response2) {
                        if (response2.status == 200) {
                            $scope.$emit('arrChanged:Add', response2.data);
                            $state.go('index.announcement.drafts');
                            utils.notify({
                                message: 'Draft created successfully',
                                type: 'success'
                            })
                        }
                    })


                } else {
                    utils.notify({
                        message: 'Error with draft saving',
                        type: 'warning'
                    });
                    vm.loading = false;
                }
            })
        }, 1000);
    }


    vm.send = function() {
        if (angular.isUndefined(vm.item.title) || vm.item.title.trim() == "") {
            vm.errName = 'errorName';
            return;
        }
        var dateToCompare = new Date();
        dateToCompare.setHours(0);

        if (Date.parse(vm.date) < Date.parse(dateToCompare)) {
            utils.notify({
                message: 'Choose another date of announcement',
                type: 'warning'
            });
            return;
        }

        vm.errName = '';
        vm.loading = true;
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


            formData.append("Date", vm.item.date);
            formData.append("IsEmergency", vm.item.isEmergency);
            formData.append("AnnouncementGroup", vm.item.announcementGroup);
            formData.append('Title', vm.item.title);
            formData.append("ShortDescription", angular.isUndefined(vm.item.shortDescription) ? "" : vm.item.shortDescription);
            formData.append("Description", angular.isUndefined(vm.item.description) ? "" : vm.item.description);

            $interval.cancel(waiter);

           /*  for (var value of formData.values()) {
                console.log(value); 
             }

             for (var key of formData.entries()) {
                console.log(key); 
             } */
 
            api.createAnnouncement(formData).then(function(response) {
                if (response.status == 200) {
                    $state.go('index.announcement.history');
                    utils.notify({
                        message: 'Announcement created successfully',
                        type: 'success'
                    })
                } else {
                    utils.notify({
                        message: 'Error with creation of announcement',
                        type: 'warning'
                    });
                    vm.loading = false;
                }
            })
        }, 1000);
    }

    vm.removeImg = function() {
        delete vm.item.banerURL;
        delete vm.item.previewImageURL;
        $timeout(function() {
            angular.element($document.find('#fileInputId')).on('change', vm.handleFileSelect);
        }, 100);
    }


    $scope.$watch(function() {
        return vm.item;
    }, function() {
        $timeout(function() {
            angular.element($document.find('#fileInputId')).on('change', vm.handleFileSelect);
        }, 100)
    });
}