'use strict';
(function () {

    class TravelRouteDetailComponent {

        constructor($http, $state, Auth) {

            var detailController = this;
            this.$http = $http;
            this.auth = Auth;
            this.$state = $state;
            //detailController.routeId = $state.params.routeId;
            detailController.routeId = '577912e2dc8d148010cea773';
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
                        detailController.getParticipants();
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

        getParticipants() {
            var detailController = this;
            detailController.$http.get('/api/travelroutes/travellers/' + detailController.routeId).then(
                function (participantsResponse) {
                    participantsResponse.data.forEach(function (item) {
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
                    console.log('Participants list on loading');
                    console.log(detailController.participants);
                },
                function (response) {
                    console.log('FAILED TO LOAD PARTICIPANTS FOR ROUTE ID: ' + detailController.routeId);
                    console.log(response);
                }
            );
        }

        joinRoute() {
            this.$state.go('join-request', {routeId: this.travelRoute._id});
        }

    }

    angular.module('travelWithApp')
        .component('travelRouteDetail', {
            templateUrl: 'app/travel-route-detail/travel-route-detail.html',
            controller: TravelRouteDetailComponent,
            controllerAs: 'drc'
        });

})();
