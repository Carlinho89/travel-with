'use strict';

angular.module('travelWithApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('add-travel-routes', {
        url: '/add-travel-routes',
        template: '<add-travel-routes></add-travel-routes>'
      });
  });
