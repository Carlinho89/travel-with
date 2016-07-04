'use strict';
(function () {

    class TravelRouteDetailComponent {

        constructor($http, $state, $stateParams, Auth) {

            var detailController = this;
            this.$http = $http;
            this.auth = Auth;
            this.$state = $state;
            detailController.routeId = $stateParams.routeId;
            //detailController.routeId = '57793aa168c9949c10df9a63';
            detailController.travelRoute = {};
            detailController.author = {};
            detailController.participants = [];
            detailController.user = Auth.getCurrentUser();
            detailController.participating = false;
            detailController.requestSent = false;
            detailController.isAuthor = false;


            $http.get('/api/travelroutes/' + detailController.routeId).then(
                function (travelRouteResponse) {
                    detailController.travelRoute = travelRouteResponse.data;
                    console.log(detailController.travelRoute);
                    $http.get('/api/users/' + travelRouteResponse.data.requestor).then(function (user) {
                        detailController.author = user.data;
                        if(detailController.author._id == detailController.user._id){
                            detailController.isAuthor = true;
                        }
                        console.log('owner in ctrl:');
                        console.log(detailController.author);
                        detailController.getParticipants();
                        detailController.getAlreadyRequested();
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

        getAlreadyRequested() {
            var detailController = this;
            var request = {};
            request.receiver = this.author;
            request.requestor = this.user;
            request.route = this.travelRoute;
            detailController.$http.post('/api/join-requests/search', request).then(
                function (joinRequest) {
                    console.log('SUCCESSFULLY LOADED EXISTING REQUEST');
                    console.log(joinRequest);
                    if (joinRequest.data.length != 0) {
                        detailController.requestSent = true;
                    }
                },
                function (err) {
                    console.log('NO REQUEST FOUND');
                    console.log(err);
                    detailController.requestSent = false;
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
