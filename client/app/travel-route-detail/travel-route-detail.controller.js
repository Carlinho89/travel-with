'use strict';
(function () {

    class TravelRouteDetailComponent {

        constructor($http, $scope, $state) {

            var detailController = this;
            var routeId = $state.params.routeId;
            //var routeId = '577783d0262a1b0019f41479';
            detailController.travelRoute = {};
            detailController.owner = {};
            detailController.participants = [];


            $http.get('/api/travelroutes/' + routeId).then(
                function (travelRouteResponse) {
                    detailController.travelRoute = travelRouteResponse.data;
                    console.log(detailController.travelRoute);
                    $http.get('/api/users/' + travelRouteResponse.data.requestor).then(function (user) {
                        detailController.owner = user.data;
                        console.log(detailController.owner)
                    }, function (response) {
                        console.log('FAILED TO LOAD REQUESTER FOR ROUTE ID: ' + routeId);
                        console.log(response);
                    });
                    $http.get('/api/travelroutes/travellers/' + routeId).then(
                        function (participantsResponse) {
                            console.log('participants for detail page');
                            console.log(participantsResponse);
                            detailController.participants = participantsResponse.data;
                        },
                        function (response) {
                            console.log('FAILED TO LOAD PARTICIPANTS FOR ROUTE ID: ' + routeId);
                            console.log(response);
                        }
                    );
                },
                function (response) {
                    console.log('FAILED TO LOAD TRAVEL ROUTE FOR ROUTE ID: ' + routeId);
                    console.log(response);
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
