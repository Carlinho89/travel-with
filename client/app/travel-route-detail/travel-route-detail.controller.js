'use strict';
(function () {

    class TravelRouteDetailComponent {

        constructor($http, $scope, $state, Auth, $rootScope) {

            var detailController = this;
            this.$http = $http;
            var scope = $scope;
            //var routeId = $state.params.routeId;
            detailController.routeId = '5777efaf8b36b0c00802c145';
            detailController.travelRoute = {};
            detailController.author = {};
            detailController.participants = [];
            detailController.user = Auth.getCurrentUser();
            detailController.participating = false;


            $http.get('/api/travelroutes/' + detailController.routeId).then(
                function (travelRouteResponse) {
                    detailController.travelRoute = travelRouteResponse.data;
                    console.log(detailController.travelRoute);
                    $http.get('/api/users/' + travelRouteResponse.data.requestor).then(function (user) {
                        detailController.author = user.data;
                        console.log('owner in ctrl:');
                        console.log(detailController.author);
                        detailController.getParticipants(detailController);
                    }, function (response) {
                        console.log('FAILED TO LOAD REQUESTER FOR ROUTE ID: ' + detailController.routeId);
                        console.log(response);
                    });

                },
                function (response) {
                    console.log('FAILED TO LOAD TRAVEL ROUTE FOR ROUTE ID: ' + detailController.routeId);
                    console.log(response);
                }
            );

        }
        getParticipants(detailController){
            detailController.$http.get('/api/travelroutes/travellers/' + detailController.routeId).then(
                function (participantsResponse) {
                    console.log('participants for detail page');
                    participantsResponse.data.forEach(function(item){
                        detailController.participants.push(item);
                    });
                    if (detailController.user._id == detailController.author._id) {
                        detailController.participating = true;
                    }
                    detailController.participants.forEach(function (participant) {
                        if (detailController.user._id == participant._id) {
                            detailController.participating = true;
                        }
                    });
                    console.log(detailController.participants);
                },
                function (response) {
                    console.log('FAILED TO LOAD PARTICIPANTS FOR ROUTE ID: ' + detailController.routeId);
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
