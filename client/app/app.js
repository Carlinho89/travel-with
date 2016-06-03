'use strict';

angular.module('travelWithApp', ['travelWithApp.auth', 'travelWithApp.admin',
    'travelWithApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'btford.socket-io',
    'ui.router', 'ui.bootstrap', 'validation.match'  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  });
