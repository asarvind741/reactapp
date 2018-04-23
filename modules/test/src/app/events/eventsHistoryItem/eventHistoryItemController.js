angular
    .module('admin')
    .controller('EventHistoryItemController', EventHistoryItemController)

function EventHistoryItemController(api, $log, id, eventsRepeateStates, parseWhenDate, $scope, $state, FileUploader, $interval, $timeout, $uibModal, securityContext, moment, $filter) {
    var vm = this;
    if (securityContext.data.permissions.events == 'write') {
        vm.showControls = true;
    }
    vm.showSpinner = true;
    vm.showEditButtons = false;
    vm.loading = false;

    vm.tinymceOptions = {
        plugins: 'textcolor colorpicker ',
        block_formats: 'Paragraph=p;Header 1=h1;Header 2=h2;Header 3=h3; Header 4 = h4; Header 5=h5;Header 6=h6',
        toolbar: 'formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | forecolor',
        height: 300,
        menubar: false,
        statusbar: false,
        readonly: true
    }
    vm.repeateStates = eventsRepeateStates();

    function isEmpty(str) {
        return (!str || 0 === str.length);
    }

    api.getEventFromHistory(id).then(function(response) {
        if (response.status == 200) {
            vm.showSpinner = false;
            vm.item = response.data;
            vm.item.dateOfEvent += 'Z';
            vm.date = moment(vm.item.dateOfEvent, moment.ISO_8601)._d;
            if (!isEmpty(response.data.bannerFileName) || !isEmpty(response.data.previewImageFileName)) {
                api.getFile(response.data.bannerFileName).then(function(response) {
                    vm.item.banner = response;
                });
                api.getFile(response.data.previewImageFileName).then(function(response) {
                    vm.item.previewImage = response;
                });
            }

            if (vm.item.eventHistoryImageFilesNames.length > 0) {
                vm.item.eventHistoryImages = vm.item.eventHistoryImageFilesNames.map(function(item, index, array) {
                    var newItem = {
                        imagePath: array[index]
                    }
                    api.getFile(newItem.imagePath).then(function(response) {
                        newItem.imageURL = response
                    });
                    return newItem;
                })
            }
            vm.item.status = $filter('status')(vm.item);
            vm.whenDate = parseWhenDate(vm.item.repeatEventState, vm.date);
        } else {
            $state.go('index.events');
        }
    })

    vm.save = function() {
        vm.loading = true;
        vm.item.date = moment(vm.date).format();
        var waiter = $interval(function() {
            var formData = new FormData();
            if (angular.isUndefined(vm.myCroppedImageBlob) && angular.isDefined(vm.item.banner)) {
                formData.append("Banner", vm.item.bannerFileName);
                formData.append("PreviewImage", vm.item.previewImageFileName);
                formData.append("ImageState", 0);
            }

            if (vm.item.eventHistoryImages) {
                vm.item.eventHistoryImages.forEach(function(item, i) {
                    formData.append("ImagesPathes[" + i + "]", item.imagePath);
                })
            }

            formData.append("TimeOfEvent", vm.item.timeOfEvent);
            formData.append('IsInDraft', true);
            formData.append('CreationDate', $filter('date')(new Date(), 'yyyy-MM-ddTHH:mmZ', 'UTC'));
            formData.append('ShortDescription', angular.isUndefined(vm.item.shortDescription) ? "" : vm.item.shortDescription);
            formData.append('Description', angular.isUndefined(vm.item.description) ? "" : vm.item.description);
            formData.append('RepeatEventState', vm.item.repeatEventState);
            formData.append('Name', angular.isUndefined(vm.item.name) ? "" : vm.item.name);
            formData.append('Location', angular.isUndefined(vm.item.location) ? "" : vm.item.location);
            formData.append('Remark', angular.isUndefined(vm.item.remark) ? "" : vm.item.remark);

            $interval.cancel(waiter);

            api.createEvent(formData).then(function(response) {
                if (response.status == 200) {
                    api.getAllDraftsEvents().then(function(response2) {
                        if (response2.status == 200) {
                            $scope.$emit('arrEventChanged:Add', response2.data);
                            $state.go('index.events');
                        }
                    })
                }
            })
        }, 1000);
    }
}