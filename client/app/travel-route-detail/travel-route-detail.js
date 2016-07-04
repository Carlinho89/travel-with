'use strict';

angular.module('travelWithApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('travel-route-detail', {
                url: '/travel-route-detail/:routeId',
                template: '<travel-route-detail></travel-route-detail>'
            });
    });
