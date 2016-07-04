'use strict';

angular.module('travelWithApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('users-join-requests', {
        url: '/users-join-requests',
        template: '<users-join-requests></users-join-requests>'
      });
  });
