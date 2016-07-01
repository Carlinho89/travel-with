'use strict';
(function () {

    class TravelRouteDetailComponent {

        constructor($http, $scope, $state) {

            var detailController = this;
            var routeId = $state.params.routeId;
            detailController.travelRoute = {
                title: '',
                description: '',
                requestor: null,
                itineraryItems: []
            };


            $http.get('/api/travelroutes/' + routeId).then(
                function (response) {
                    // success callback
                    detailController.travelRoute = response;
                    console.log(detailController.travelRoute);
                },
                function (response) {
                    console.log('error');
                    console.log(response);
                    // failure callback
                }
            );
        }
    }

    angular.module('travelWithApp')
        .component('travelRouteDetail', {
            templateUrl: 'app/travel-route-detail/travel-route-detail.html',
            controller: TravelRouteDetailComponent,
            controllerAs: 'drc'
        });

})();
