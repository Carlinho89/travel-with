'use strict';

angular.module('travelWithApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('list-travel-routes', {
        url: '/list-travel-routes',
        template: '<list-travel-routes></list-travel-routes>'
      });
  });
