'use strict';

angular.module('travelWithApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('requests', {
        url: '/requests',
        template: '<requests></requests>'
      });
  });
