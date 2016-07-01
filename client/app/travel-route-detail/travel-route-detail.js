'use strict';

angular.module('travelWithApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('travel-route-detail', {
        url: '/travel-route-detail',
        template: '<travel-route-detail></travel-route-detail>'
      });
  });
