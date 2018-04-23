angular
    .module('admin')
    .service('checkService', checkService)

function checkService(utils) {

    this.regExName = /[^a-zA-z0-9 ]+/;
    this.regExPhone = /[^0-9 +]+/;
    this.regExEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.checkNameWithDublicate = function(id, name, arr) {
        if (angular.isUndefined(name)) {
            utils.notify({
                message: 'Please, enter name',
                type: 'error'
            });
        }

        var clone = arr.filter(function(item) {
            if (item.name === name && item.id != id) {
                return item;
            }
        })[0];

        if (clone) {
            utils.notify({
                message: name + ' has been already exist',
                type: 'error'
            })
        }

        if (name === '') {
            utils.notify({
                message: 'Please, enter name',
                type: 'error'
            });
        }

        if ((this.regExName.test(name)) && !(clone) && angular.isDefined(name) || angular.isDefined(name) && name.length < 2 && !(name === '')) {
            utils.notify({
                message: 'Please, enter correct name',
                type: 'error'
            })
        }

        if (angular.isUndefined(name) || clone || name === '' || (this.regExName.test(name)) && !(clone) || name.length < 2) {
            return "";
        } else {
            return true;
        }
    }

    this.checkNameWithOutDublicates = function(id, name) {
        if (angular.isUndefined(name)) {
            utils.notify({
                message: 'Please, enter name',
                type: 'error'
            });
        }
        if (name === '') {
            utils.notify({
                message: 'Please, enter name',
                type: 'error'
            });
        }

        if ((this.regExName.test(name)) && angular.isDefined(name) && !(name === '') || angular.isDefined(name) && name.length < 2 && !(name === '')) {
            utils.notify({
                message: 'Please, enter correct name',
                type: 'error'
            })
        }

        if (angular.isUndefined(name) || name === '' || (this.regExName.test(name)) || name.length < 2) {
            return "";
        } else {
            return true;
        }
    }

    this.checkPhone = function(phone) {

        if (angular.isUndefined(phone)) {
            utils.notify({
                message: 'Please, enter phone number',
                type: 'error'
            });

        }
        if (phone === '') {
            utils.notify({
                message: 'Please, enter phone number',
                type: 'error'
            });
        }

        if ((this.regExPhone.test(phone)) && angular.isDefined(phone) || angular.isDefined(phone) && phone.length < 2 && !(phone === '')) {
            utils.notify({
                message: 'Please, enter correct phone number',
                type: 'error'
            })
        }

        if (angular.isUndefined(phone) || phone === '' || (this.regExPhone.test(phone)) || phone.length < 2) {
            return "";
        } else {
            return true;
        }
    }

    this.checkEmail = function(data) {
        if (data === '' || angular.isUndefined(data) || !data.match(this.regExEmail)) {
            utils.notify({
                message: 'E-mail is not valid',
                type: 'error'
            })

            return "";
        } else {
            return true;
        }
    }
}