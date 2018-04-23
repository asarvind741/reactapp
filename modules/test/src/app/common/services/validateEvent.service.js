angular
  .module('admin')
  .service('validateEventForm', validateEventForm)

function validateEventForm(utils) {

  // this.error = {};
  var empty = {
    errorName: false,
    errorShortDescription: false,
    errorLocation: false,
    errorDescription: false,
    valid: false
  };



  this.validForm = function (form) {
    if (form.name === '' || angular.isUndefined(form.name)) {
      utils.notify({
        message: 'Please enter Title',
        type: 'error'
      })
      this.error = angular.extend({}, empty);
      this.error.errorName = true;
      return this.error;
    } else {
      if (form.shortDescription === '' || angular.isUndefined(form.shortDescription)) {
        this.error = angular.extend({}, empty);
        this.error.errorShortDescription = true;
        utils.notify({
          message: 'Please enter Short Description',
          type: 'error'
        })

        return this.error;
      } else {
        if (form.description === '' || angular.isUndefined(form.description)) {
          this.error = angular.extend({}, empty);
          this.error.errorDescription = true;
          utils.notify({
            message: 'Please enter Description',
            type: 'error'
          })
          return this.error;
        } else {
          if (form.location === '' || angular.isUndefined(form.location)) {
            this.error = angular.extend({}, empty);
            this.error.errorLocation = true;
            utils.notify({
              message: 'Please enter Location',
              type: 'error'
            })
            return this.error;
          } else {
            this.error = angular.extend({}, empty);

            this.error.valid = true;
            return this.error;
          }
        }
      }
    }
  }
}
