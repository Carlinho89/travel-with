'use strict';
(function () {

    class TravelRouteDetailComponent {
        constructor(routeDetailService) {
            this.route = routeDetailService;
        }
    }

    angular.module('travelWithApp')
        .component('travelRouteDetail', {
            templateUrl: 'app/travel-route-detail/travel-route-detail.html',
            controller: TravelRouteDetailComponent,
            controllerAs: 'drc'
        });

})();
