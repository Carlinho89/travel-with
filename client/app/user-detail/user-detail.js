'use strict';

angular.module('travelWithApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('user-detail', {
        url: '/user-detail?userID',
        template: '<user-detail></user-detail>'
      });
  });
