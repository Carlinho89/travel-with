'use strict';

angular.module('travelWithApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('travel-route-detail', {
                url: '/travel-route-detail',
                params: {
                    routeId: null
                },
                template: '<travel-route-detail></travel-route-detail>'
            });
    });
