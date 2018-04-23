angular
    .module('admin')
    .service('parseWhenDate', parseWhenDate)

function parseWhenDate($filter) {
    var whenDate;
    return function(state, date) {
        switch (state) {
            case 0:
                whenDate = $filter('date')(date, 'dd.MM.yyyy');
                break;
            case 1:
                whenDate = $filter('date')(date, 'EEEE');
                break;
            case 2:
                whenDate = $filter('date')(date, "d'th every month'");
                break;
            case 3:
                whenDate = "Every Day";
        }
        return whenDate;
    }
}