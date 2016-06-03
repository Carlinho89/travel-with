'use strict';

angular.module('travelWithApp')
  .config(function($stateProvider) {
    $stateProvider.state('landingPage', {
      url: '/',
      template: '<landing-search></landing-search>'
    });
  });
