'use strict';

class LoginController {
  constructor(Auth, $state) {
    this.user = {};
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
    this.$state = $state;
    this.user.email = "carlo@example.com";
    this.user.password = "carlo";
  }

  login(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.login({
          email: this.user.email,
          password: this.user.password
        })
        .then(() => {
          // Logged in, redirect to home
          this.$state.go('landingPage');
        })
        .catch(err => {
          this.errors.other = err.message;
        });
    }
  }
}

angular.module('travelWithApp')
  .controller('LoginController', LoginController);
