'use strict';

angular.module('travelWithApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('join-request', {
                url: '/join-request',
                params: {
                    routeId: null
                },
                template: '<join-request></join-request>'
            });
    });
