function utils(notify, moment, $filter) {

    this.notify = function(data) {
        notify.closeAll();

        var defaults = {
            message: '',
            type: 'info',
            duration: 1000
        };

        data = angular.extend(defaults, data);

        notify({
            message: data.message,
            classes: 'alert-' + data.type
        })
    };

    this.delete = function(array, id) {
        var doomed = array.filter(function(pendingItem) {
            return pendingItem.id == id
        })[0];
        if (angular.isUndefined(doomed)) {
            return array;
        } else
            var index = array.indexOf(doomed);
        array.splice(index, 1);
        return array;
    };

    this.convertToLocal = function(time) {
        var timeConverted = moment(time).utc(time).local().format();
        return timeConverted;
    };
    this.convertToUTC = function(time) {
        var timeConverted = moment(time).local(time).utc().format();
        return timeConverted;
    };
    this.filterByTime = function(array) {
        var filtered = {
            previousArr: [],
            thirtyMinArr: [],
            todayArr: [],
            nextArr: []
        }

        var nowDate = new Date();

        var thirtyMinLater = new Date(nowDate);
        thirtyMinLater.setMinutes(nowDate.getMinutes() + 29);

        var tillTodayMidnight = new Date();
        tillTodayMidnight.setHours(23, 59, 59, 59);

        var nextTime = new Date();
        nextTime.setFullYear(nextTime.getFullYear() + 10);

        nowDate = nowDate.toISOString();
        thirtyMinLater = thirtyMinLater.toISOString();
        tillTodayMidnight = tillTodayMidnight.toISOString();
        nextTime = nextTime.toISOString();

        filtered.previousArr = $filter('datePrevious')(array, nowDate);
        filtered.thirtyMinArr = $filter('dateRange')(array, nowDate, thirtyMinLater);
        filtered.todayArr = $filter('dateRange')(array, thirtyMinLater, tillTodayMidnight);
        filtered.nextArr = $filter('dateRange')(array, tillTodayMidnight, nextTime);
        return filtered;
    };
}

angular
    .module('admin')
    .service('utils', utils)