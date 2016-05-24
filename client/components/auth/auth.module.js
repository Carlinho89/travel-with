'use strict';

angular.module('travelWithApp.auth', ['travelWithApp.constants', 'travelWithApp.util', 'ngCookies',
    'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
