'use strict';
(function () {

    class TravelRouteDetailComponent {

        constructor($http, $scope, $state) {

            var detailController = this;
            var routeId = $state.params.routeId;
            //var routeId = '577783d0262a1b0019f41479';
            detailController.travelRoute = {};
            detailController.owner = {};


            $http.get('/api/travelroutes/' + routeId).then(
                function (response) {
                    // success callback
                    detailController.travelRoute = response.data;
                    console.log(detailController.travelRoute);
                    $http.get('/api/users/' + response.data.requestor).then(function (user) {
                        detailController.owner = user.data;
                        console.log(detailController.owner)
                    }, function (response) {
                        console.log('error');
                        console.log(response);
                    });
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
