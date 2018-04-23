angular
    .module('admin')
    .filter('utcToLocal', utcToLocal)
    .filter('dateRange', dateRange)
    .filter('datePrevious', datePrevious)
    .filter('addZtoItemRequestTime', addZtoItemRequestTime)
    .filter('status', status)
    .filter('nextDueDate', nextDueDate)


function utcToLocal($filter) {
    return function(utcDateString, format) {
        if (!utcDateString) {
            return;
        }
        if (utcDateString.indexOf('Z') === -1 && utcDateString.indexOf('+') === -1) {
            utcDateString += 'Z';
        }
        return $filter('date')(utcDateString, format);
    };
}

function dateRange() {
    return function(items, fromDate, toDate) {
        var filtered = [];
        var from_date = Date.parse(fromDate);
        var to_date = Date.parse(toDate);

        angular.forEach(items, function(item) {
            var itemTime = Date.parse(item.requestTime);
            if (itemTime > from_date && itemTime < to_date) {
                filtered.push(item);
            }
        });
        return filtered;
    };
}

function datePrevious() {

    return function(items, toDate) {
        var filtered = [];
        var to_date = Date.parse(toDate);

        angular.forEach(items, function(item) {
            var itemTime = Date.parse(item.requestTime);
            if (itemTime < to_date) {
                filtered.push(item);
            }
        });
        return filtered;
    };
}

function addZtoItemRequestTime() {
    return function(items) {
        var filtered = [];
        angular.forEach(items, function(item) {
            item.requestTime += 'Z';
            filtered.push(item);
        });
        return filtered;
    };
}

function status() {
    return function(input) {
        var output;
        var repeateStates = ["One time", "Weekly", "Monthly", "Daily"];
        repeateStates.forEach(function(item, i) {
            if (input.repeatEventState == i) {
                output = item;
            }
        })
        return output;
    }
}

function nextDueDate($filter, moment) {
    return function(input) {
        function addWeek(day, today) {
            if (day.isBefore(today)) {
                day.add(7, 'days');
                addWeek(day, today);
            } else {
                return moment(day).toISOString();
            }
            return moment(day).toISOString();
        }

        function addMonth(day, today) {
            if (day.isBefore(today)) {
                day.add(1, 'months');
                addMonth(day, today);
            } else {
                return moment(day).toISOString();
            }
            return moment(day).toISOString();
        }
        switch (input.repeatEventState) {
            case 1:
                var day1 = moment(input.creationDate);
                var today1 = moment().endOf('day');
                var interim1 = addWeek(day1, today1);
                input.nextDueDate = interim1;
                break;
            case 2:
                var day2 = moment(input.creationDate);
                var today2 = moment().endOf('day');
                var interim2 = addMonth(day2, today2);
                input.nextDueDate = interim2;
                break;
        }
        return input;
    }
}