'use strict';
angular
    .module('admin')
    .factory('api', api);

function api($http, webApi, $q, $window) {

    return {
        getUserInfo: _getUserInfo,
        getFile: _getFile,

        //transportation block
        getAllPendingTaxiRequests: _getAllPendingTaxiRequests,
        approveTaxiRequest: _approveTaxiRequest,
        rejectTaxiRequest: _rejectTaxiRequest,

        getAllActiveTaxiRequests: _getAllActiveTaxiRequests,
        getCammingThirtyMin: _getCammingThirtyMin,
        getInProgress: _getInProgress,
        getUserActiveTaxiRequests: _getUserActiveTaxiRequests,
        assignRequest: _assignRequest,
        getAllCompleteTaxiRequests: _getAllCompleteTaxiRequests,
        markAsComplete: _markAsComplete,

        getTaxiDestinations: _getTaxiDestinations,
        createTaxiDestination: _createTaxiDestination,
        updateTaxiDestination: _updateTaxiDestination,
        deleteTaxiDestination: _deleteTaxiDestination,

        getHistoryApproved: _getHistoryApproved,
        getHistoryRejected: _getHistoryRejected,
        getAllTaxiHistory: _getAllTaxiHistory,

        getTaxiCar: _getTaxiCar,
        getTaxiCars: _getTaxiCars,
        getCarModelTaxiCars: _getCarModelTaxiCars,
        createTaxiCar: _createTaxiCar,
        updateTaxiCar: _updateTaxiCar,
        deleteTaxiCar: _deleteTaxiCar,
        getAvailableNumbersByCarId: _getAvailableNumbersByCarId,
        getAvailableTaxiCars: _getAvailableTaxiCars,

        getTaxiCarModel: _getTaxiCarModel,
        getTaxiCarModels: _getTaxiCarModels,
        createTaxiCarModel: _createTaxiCarModel,
        updateTaxiCarModels: _updateTaxiCarModels,
        deleteTaxiCarModels: _deleteTaxiCarModels,

        getDrivers: _getDrivers,
        addDriver: _addDriver,
        updateDriver: _updateDriver,
        deleteDriver: _deleteDrive,
        getDriver: _getDriver,
        getAvailableTaxiDrivers: _getAvailableTaxiDrivers,


        //announcememnt block
        getAnnouncement: _getAnnouncement,
        getAnnouncements: _getAnnouncements,
        createAnnouncement: _createAnnouncement,

        createDraft: _createDraft,
        getDrafts: _getDrafts,
        updateAnnouncement: _updateAnnouncement,
        deleteAnnouncement: _deleteAnnouncement,

        getAnnouncementHistory: _getAnnouncementHistory,

        //feedback block
        getFeedbackCategories: _getFeedbackCategories,
        createFeedbackCategories: _createFeedbackCategories,
        updateFeedbackCategories: _updateFeedbackCategories,
        deleteFeedbackCategories: _deleteFeedbackCategories,

        //shuttle block
        createShuttleRace: _createShuttleRace,
        getAllShuttleRaces: _getAllShuttleRaces,
        updateShuttleRace: _updateShuttleRace,
        deleteShuttleRace: _deleteShuttleRace,
        changeSchedule: _changeSchedule,

        getAllpendingShuttleRequests: _getAllpendingShuttleRequests,
        getAllAssignedShuttleRequests: _getAllAssignedShuttleRequests,
        assignShuttleRequest: _assignShuttleRequest,


        getAllShuttleDrivers: _getAllShuttleDrivers,
        createShuttleDriver: _createShuttleDriver,
        updateShuttleDriver: _updateShuttleDriver,
        deleteShuttleDriver: _deleteShuttleDriver,

        getShuttleModels: _getShuttleModels,
        createShuttleModel: _createShuttleModel,
        updateShuttleModel: _updateShuttleModel,
        deleteShuttleModel: _deleteShuttleModel,

        getAllShuttleModelShuttleCars: _getAllShuttleModelShuttleCars,
        createShuttleCar: _createShuttleCar,
        updateShuttleCar: _updateShuttleCar,
        deleteShuttleCar: _deleteShuttleCar,

        getShuttleDestinaions: _getShuttleDestinaions,
        createShuttleDestinaion: _createShuttleDestinaion,
        updateShuttleDestinaion: _updateShuttleDestinaion,
        deleteShuttleDestinaion: _deleteShuttleDestinaion,

        //event block
        createEvent: _createEvent,
        getAllEventsPerMonth: _getAllEventsPerMonth,
        getAllEventsPerDay: _getAllEventsPerDay,
        getEvent: _getEvent,
        getAllRepeatedEvents: _getAllRepeatedEvents,
        deleteEvent: _deleteEvent,
        addExcludeDate: _addExcludeDate,
        getAllDraftsEvents: _getAllDraftsEvents,
        updateEvent: _updateEvent,
        getEventHistory: _getEventHistory,
        getEventFromHistory: _getEventFromHistory
    }


    function _getUserInfo() {
        return $http.get(webApi['DOMAIN'] + '/api/User/GetAdminInfo');
    }


    function _getFile(id) {
        console.log("id",id);
        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: webApi['DOMAIN'] + '/api/File/GetFile',
            params: { fileName: id },
            responseType: 'arraybuffer'
        }).success(function(data, status, headers) {
            headers = headers();
            var contentType = headers['content-type'];
            var blob = new Blob([data], { type: contentType });
            var url = $window.URL.createObjectURL(blob);
            deferred.resolve(url);
        }).error(function(data, status) {
            deferred.reject(status);
        })

        return deferred.promise;
    }


    //transportation block

    function _getAllPendingTaxiRequests() {
        return $http.get(webApi['DOMAIN'] + '/api/Taxi/GetAllPendingTaxiRequests')
    }

    function _approveTaxiRequest(IDs) {
        return $http.post(webApi['DOMAIN'] + '/api/Taxi/ApproveTaxiRequest', angular.toJson(IDs));
    }

    function _rejectTaxiRequest(data) {
        return $http.post(webApi['DOMAIN'] + '/api/Taxi/RejectTaxiRequest', angular.toJson(data));
    }


    function _getAllActiveTaxiRequests() {
        return $http.get(webApi['DOMAIN'] + '/api/Taxi/GetAllActiveTaxiRequests')
    }

    function _getCammingThirtyMin() {
        return $http.get(webApi['DOMAIN'] + '/api/Taxi/GetCommingThirtyMin')
    }

    function _getInProgress() {
        return $http.get(webApi['DOMAIN'] + '/api/Taxi/GetInProgress')
    }

    function _getUserActiveTaxiRequests() {
        return $http.get(webApi['DOMAIN'] + '/api/Taxi/GetUserActiveTaxiRequests')
    }

    function _assignRequest(data) {
        return $http.post(webApi['DOMAIN'] + '/api/Taxi/Assign', angular.toJson(data));
    }

    function _getAllCompleteTaxiRequests() {
        return $http.get(webApi['DOMAIN'] + '/api/Taxi/GetAllCompleteTaxiRequests')
    }

    function _markAsComplete(IDs) {
        return $http.post(webApi['DOMAIN'] + '/api/Taxi/MarkAsComplete', angular.toJson(IDs));
    }

    function _getTaxiDestinations() {
        return $http.get(webApi['DOMAIN'] + '/api/TaxiDestination/GetTaxiDestinations');
    }

    function _createTaxiDestination(data) {
        return $http.post(webApi['DOMAIN'] + '/api/TaxiDestination/CreateTaxiDestination', angular.toJson(data));
    }

    function _updateTaxiDestination(data) {
        return $http.post(webApi['DOMAIN'] + '/api/TaxiDestination/UpdateTaxiDestination', angular.toJson(data));
    }

    function _deleteTaxiDestination(data) {
        return $http.post(webApi['DOMAIN'] + '/api/TaxiDestination/DeleteTaxiDestination', angular.toJson(data));
    }

    function _getAllTaxiHistory(start, end) {
        return $http({
            url: webApi['DOMAIN'] + '/api/Taxi/GetAllHistory',
            method: "GET",
            params: {
                StartDate: start,
                EndDate: end
            }
        })
    }

    function _getHistoryRejected(start, end) {
        return $http({
            url: webApi['DOMAIN'] + '/api/Taxi/GetHistoryRejected',
            method: "GET",
            params: {
                startDay: start,
                endDay: end
            }
        })
    }

    function _getHistoryApproved(start, end) {
        return $http({
            url: webApi['DOMAIN'] + '/api/Taxi/GetHistoryApproved',
            method: "GET",
            params: {
                startDay: start,
                endDay: end
            }
        })
    }

    function _getTaxiCar(IDs) {
        return $http({
            url: webApi['DOMAIN'] + '/api/TaxiCar/GetTaxiCar',
            method: "GET",
            params: { carId: IDs }
        })
    }

    function _getTaxiCars() {
        return $http.get(webApi['DOMAIN'] + '/api/TaxiCar/GetTaxiCars')
    }


    function _getCarModelTaxiCars(IDs) {
        return $http({
            url: webApi['DOMAIN'] + '/api/TaxiCar/GetAllCarModelTaxiCars',
            method: "GET",
            params: { carModelId: IDs }
        })
    }

    function _createTaxiCar(data) {
        return $http.post(webApi['DOMAIN'] + '/api/TaxiCar/CreateTaxiCar', angular.toJson(data))
    }

    function _updateTaxiCar(data) {
        return $http.post(webApi['DOMAIN'] + '/api/TaxiCar/UpdateTaxiCar', angular.toJson(data))

    }

    function _deleteTaxiCar(data) {
        return $http.post(webApi['DOMAIN'] + '/api/TaxiCar/DeleteTaxiCar', angular.toJson(data))

    }

    function _getAvailableNumbersByCarId(id) {
        return $http({
            url: webApi['DOMAIN'] + '/api/TaxiCar/GetAvailableCarModelTaxiCars',
            method: "GET",
            params: { carModelId: id }
        })
    }

    function _getAvailableTaxiCars() {
        return $http.get(webApi['DOMAIN'] + '/api/TaxiCar/GetAvailableTaxiCars');
    }


    function _getTaxiCarModel(IDs) {
        return $http({
            url: webApi['DOMAIN'] + '/api/TaxiCarModel/GetTaxiCarModel',
            method: "GET",
            params: { id: IDs }
        })
    }

    function _getTaxiCarModels() {
        return $http.get(webApi['DOMAIN'] + '/api/TaxiCarModel/GetTaxiCarModels');
    }

    function _createTaxiCarModel(data) {
        return $http.post(webApi['DOMAIN'] + '/api/TaxiCarModel/CeateTaxiCarModel', angular.toJson(data))
    }

    function _updateTaxiCarModels(data) {
        return $http.post(webApi['DOMAIN'] + '/api/TaxiCarModel/UpdateTaxiCarModel', angular.toJson(data))
    }

    function _deleteTaxiCarModels(data) {
        return $http.post(webApi['DOMAIN'] + '/api/TaxiCarModel/DeleteTaxiCarModel', angular.toJson(data))
    }


    function _getDrivers() {
        return $http.get(webApi['DOMAIN'] + '/api/TaxiDriver/GetTaxiDrivers')
    }

    function _getDriver(IDs) {
        return $http({
            url: webApi['DOMAIN'] + '/api/TaxiDriver/GetTaxiDriver',
            method: "GET",
            params: { id: IDs }
        })
    }

    function _addDriver(data) {
        return $http.post(webApi['DOMAIN'] + '/api/TaxiDriver/CreateTaxiDriver', data)
    }

    function _updateDriver(data) {
        return $http.post(webApi['DOMAIN'] + '/api/TaxiDriver/UpdateTaxiDriver', angular.toJson(data))
    }

    function _deleteDrive(IDs) {
        return $http.post(webApi['DOMAIN'] + '/api/TaxiDriver/DeleteTaxiDriver', angular.toJson(IDs))
    }

    function _getAvailableTaxiDrivers() {
        return $http.get(webApi['DOMAIN'] + '/api/TaxiDriver/GetAvailableTaxiDrivers')
    }


    //announcement block
    function _getAnnouncement(IDs) {
        return $http({
            url: webApi['DOMAIN'] + '/api/Announcement/GetAnnouncement',
            method: "GET",
            params: { id: IDs }
        })
    }

    function _getAnnouncements() {
        return $http.get(webApi['DOMAIN'] + '/api/Announcement/GetAnnouncements')
    }



    function _createAnnouncement(data) {
        return $http.post(webApi['DOMAIN'] + '/api/Announcement/CreateAnnouncement', data, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
    }


    function _createDraft(data) {
        return $http.post(webApi['DOMAIN'] + '/api/Announcement/CreateDraft', data, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        });
    }

    function _getDrafts() {
        return $http.get(webApi['DOMAIN'] + '/api/Announcement/GetDrafts')
    }

    function _updateAnnouncement(data) {
        return $http.post(webApi['DOMAIN'] + '/api/Announcement/UpdateAnnouncement', data, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        });
    }

    function _deleteAnnouncement(data) {
        return $http.post(webApi['DOMAIN'] + '/api/Announcement/DeleteAnnouncement', angular.toJson(data))
    }


    function _getAnnouncementHistory(start, end) {
        return $http({
            url: webApi['DOMAIN'] + '/api/Announcement/GetHistory',
            method: "GET",
            params: {
                startDay: start,
                endDay: end
            }
        })
    }

    //feedback block
    function _getFeedbackCategories() {
        return $http.get(webApi['DOMAIN'] + '/api/FeedBackCategories/GetFeedBackCategories');
    }

    function _createFeedbackCategories(data) {
        return $http.post(webApi['DOMAIN'] + '/api/FeedBackCategories/CreateFeedBackCategory', angular.toJson(data));
    }

    function _updateFeedbackCategories(data) {
        return $http.post(webApi['DOMAIN'] + '/api/FeedBackCategories/UpdateFeedBackCategory', angular.toJson(data));
    }

    function _deleteFeedbackCategories(id) {
        return $http.post(webApi['DOMAIN'] + '/api/FeedBackCategories/DeleteFeedBackCategory', angular.toJson(id));
    }

    //shuttle block

    function _createShuttleRace(data) {
        return $http.post(webApi['DOMAIN'] + '/api/ShuttleSchedule/CreateShuttleRace', angular.toJson(data))
    }

    function _getAllShuttleRaces(id) {
        return $http({
            url: webApi['DOMAIN'] + '/api/ShuttleSchedule/GetAllShuttleRaces',
            method: "GET",
            params: { date: id }
        })

    }

    function _updateShuttleRace(data) {
        return $http.post(webApi['DOMAIN'] + '/api/ShuttleSchedule/UpdateSheduleRace', angular.toJson(data))

    }

    function _deleteShuttleRace(id) {

        return $http.post(webApi['DOMAIN'] + '/api/ShuttleSchedule/DeleteSheduleRace', id)
    }

    function _changeSchedule() {
        return $http.post(webApi['DOMAIN'] + '/api/ShuttleSchedule/ChangeShedule');
    }

    function _getAllpendingShuttleRequests() {
        return $http.get(webApi['DOMAIN'] + '/api/ShuttleRequest/GetAllPendingShuttleRequests');
    }

    function _getAllAssignedShuttleRequests(data) {
        return $http({
            url: webApi['DOMAIN'] + '/api/ShuttleRequest/GetAllAssignedShuttleRequests',
            method: "GET",
            params: { date: data }
        })
    }

    function _assignShuttleRequest(data) {
        return $http.post(webApi['DOMAIN'] + '/api/ShuttleRequest/Assign', angular.toJson(data))
    }

    function _getAllShuttleDrivers() {
        return $http.get(webApi['DOMAIN'] + '/api/ShuttleDriver/GetAllShuttleDrivers');
    }

    function _createShuttleDriver(data) {
        return $http.post(webApi['DOMAIN'] + '/api/ShuttleDriver/CreateShuttleDriver', angular.toJson(data))
    }

    function _updateShuttleDriver(data) {
        return $http.post(webApi['DOMAIN'] + '/api/ShuttleDriver/UpdateShuttleDriver', data);
    }

    function _deleteShuttleDriver(id) {
        return $http.post(webApi['DOMAIN'] + '/api/ShuttleDriver/DeleteShuttleDriver', angular.toJson(id))
    }


    function _getShuttleModels() {
        return $http.get(webApi['DOMAIN'] + '/api/ShuttleModel/GetShuttleModels');
    }

    function _createShuttleModel(name) {
        return $http.post(webApi['DOMAIN'] + '/api/ShuttleModel/CreateShuttleModel', angular.toJson(name))
    }

    function _updateShuttleModel(data) {
        return $http.post(webApi['DOMAIN'] + '/api/ShuttleModel/UpdateShuttleModel', angular.toJson(data))

    }

    function _deleteShuttleModel(id) {
        return $http.post(webApi['DOMAIN'] + '/api/ShuttleModel/DeleteShuttleModel', id)
    }


    function _getAllShuttleModelShuttleCars(id) {
        return $http({
            url: webApi['DOMAIN'] + '/api/ShuttleCar/GetAllShuttleModelShuttleCars',
            method: "GET",
            params: {
                shuttleModelId: id
            }
        })
    }

    function _createShuttleCar(data) {
        return $http.post(webApi['DOMAIN'] + '/api/ShuttleCar/CreateShuttleCar', angular.toJson(data))
    }

    function _updateShuttleCar(data) {
        return $http.post(webApi['DOMAIN'] + '/api/ShuttleCar/UpdateShuttleCar', angular.toJson(data))
    }

    function _deleteShuttleCar(id) {
        return $http.post(webApi['DOMAIN'] + '/api/ShuttleCar/DeleteShuttleCar', angular.toJson(id))
    }

    function _getShuttleDestinaions() {
        return $http.get(webApi['DOMAIN'] + '/api/ShuttleDestination/GetShuttleDestinations');
    }

    function _createShuttleDestinaion(data) {
        return $http.post(webApi['DOMAIN'] + '/api/ShuttleDestination/CreateShuttleDestination', angular.toJson(data));
    }

    function _updateShuttleDestinaion(data) {
        return $http.post(webApi['DOMAIN'] + '/api/ShuttleDestination/UpdateShuttleDestination', angular.toJson(data));
    }

    function _deleteShuttleDestinaion(id) {
        return $http.post(webApi['DOMAIN'] + '/api/ShuttleDestination/DeleteShuttleDestination', angular.toJson(id));
    }

    //event block
    function _createEvent(data) {
        return $http.post(webApi['DOMAIN'] + '/api/EventKapsarc/CreateEvent', data, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
    }

    function _getAllEventsPerMonth(data) {
        return $http({
            url: webApi['DOMAIN'] + '/api/EventKapsarc/GetAllEventsPerMonth',
            method: "GET",
            params: {
                month: data
            }
        })
    }


    function _getAllEventsPerDay(data) {
        return $http({
            url: webApi['DOMAIN'] + '/api/EventKapsarc/GetAllEventsPerDay',
            method: "GET",
            params: {
                date: data
            }
        })
    }

    function _getEvent(id) {
        return $http({
            url: webApi['DOMAIN'] + '/api/EventKapsarc/GetEvent',
            method: "GET",
            params: {
                eventId: id
            }
        })
    }

    function _getAllRepeatedEvents() {
        return $http.get(webApi['DOMAIN'] + '/api/EventKapsarc/GetAllRepeatedEvents');
    }

    function _deleteEvent(data) {
        return $http.post(webApi['DOMAIN'] + '/api/EventKapsarc/DeleteEvent', angular.toJson(data))

    }

    function _addExcludeDate(data) {
        return $http.post(webApi['DOMAIN'] + '/api/EventKapsarc/AddExcludeDate', angular.toJson(data))

    }

    function _getAllDraftsEvents() {
        return $http.get(webApi['DOMAIN'] + '/api/EventKapsarc/GetAllDraftsEvents')
    }

    function _updateEvent(data) {
        return $http.post(webApi['DOMAIN'] + '/api/EventKapsarc/UpdateEvent', data, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
    }

    function _getEventHistory(data) {
        return $http({
            url: webApi['DOMAIN'] + '/api/EventKapsarc/GetEventsHistory',
            method: "GET",
            params: {
                date: data
            }
        })
    }

    function _getEventFromHistory(id) {
        return $http({
            url: webApi['DOMAIN'] + '/api/EventKapsarc/GetEventFromHistory',
            method: "GET",
            params: {
                eventId: id
            }
        })
    }

}