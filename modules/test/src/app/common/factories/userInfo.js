function userInformation() {
    var data = false;
    return {
        getData: function() {
            return data;
        },
        setData: function(val) {
            data = val;
        }
    };
}

angular
    .module('admin')
    .factory('userInformation', userInformation)