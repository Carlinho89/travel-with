'use strict';
(function () {

    class TravelRouteDetailComponent {

        constructor($http, $scope, $state, Auth, $rootScope) {

            var detailController = this;
            this.$http = $http;
            this.auth = Auth;
            detailController.routeId = $state.params.routeId;
            //detailController.routeId = '5778d5f2c9cda4401a0661f5';
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
            this.travelRoute.travellers.push(this.auth.getCurrentUser()._id)
            console.log('Updated Travel Route Object:');
            console.log(this.travelRoute);
            var detailCtrl = this;
            this.$http.put('/api/travelroutes/' + this.travelRoute._id, this.travelRoute).then(function (updatedRoute) {
                console.log('UPDATING TRAVEL ROUTE SUCCEDED. DATA RESPONSE:');
                detailCtrl.travelRoute = updatedRoute.data;
                detailCtrl.$http.get('/api/travelroutes/travellers/' + detailCtrl.travelRoute._id).then(
                    function (travellers) {
                        detailCtrl.participants = travellers.data;
                        console.log('UPDATED PARTICIPANTS AFTER JOIN');
                        console.log(detailCtrl.participants);
                        detailCtrl.participating = true;
                        console.log('USER IS PARTICIPATING:');
                        console.log(detailCtrl.participating);

                    },
                    function (response) {
                        //failure
                        console.log("failure");
                        console.log(response);
                    }
                );

            }, function (err) {
                console.log('UPDATING TRAVEL ROUTE FAILED');
                console.log(err);
            });
        }

    }

    angular.module('travelWithApp')
        .component('travelRouteDetail', {
            templateUrl: 'app/travel-route-detail/travel-route-detail.html',
            controller: TravelRouteDetailComponent,
            controllerAs: 'drc'
        });

})();
