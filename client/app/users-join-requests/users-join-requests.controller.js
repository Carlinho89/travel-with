'use strict';
(function () {

    class UsersJoinRequestsComponent {
        constructor($http, $state, Auth) {

            var userRequestsController = this;
            this.$http = $http;
            this.auth = Auth;
            this.$state = $state;
            userRequestsController.requestsBy = [];
            userRequestsController.requestsFor = [];
            userRequestsController.participants = [];
            userRequestsController.user = Auth.getCurrentUser();

            var requestBy = {};
            requestBy.receiver = this.user;
            requestBy.requestor = this.user;
            requestBy.route = {};
            console.log(requestBy);
            userRequestsController.$http.post('/api/join-requests/searchByUser', requestBy).then(
                function (joinRequest) {
                    if (joinRequest.data.length != 0) {
                        console.log('SUCCESSFULLY LOADED EXISTING REQUESTS MADE BY USER:' + requestBy.requestor.name);
                        console.log(joinRequest);
                        var request = {};
                        request.receiver = joinRequest.data[0].receiver;
                        request.requestor = joinRequest.data[0].requestor;
                        console.log(request);
                        userRequestsController.$http.get('/api/travelroutes/' + joinRequest.data[0].route).then(
                            function (travelRouteResponse) {
                                request.route = travelRouteResponse.data;
                                console.log(request.route);

                            },
                            function (response) {
                                console.log('FAILED TO LOAD TRAVEL ROUTE FOR ROUTE');
                                console.log(response);
                            }
                        );

                        userRequestsController.$http.get('/api/users/' + request.receiver).then(function (user) {
                            request.receiverName = user.data.name;
                        }, function (response) {
                            console.log('FAILED TO LOAD REQUESTER FOR ROUTE ID: ' + detailController.routeId);
                            console.log(response);
                        });

                        userRequestsController.requestsBy.push(request);
                        console.log(requestBy);
                    }

                },
                function (err) {
                    console.log('NO REQUEST BY USER FOUND');
                    console.log(err);
                }
            );

            var requestBy = {};
            requestBy.receiver = this.user;
            requestBy.requestor = this.user;
            requestBy.route = {};
            userRequestsController.$http.post('/api/join-requests/searchForUser', requestBy).then(
                function (joinRequest) {
                    if (joinRequest.data.length != 0) {
                        console.log('SUCCESSFULLY LOADED EXISTING REQUESTS FOR USER:' + requestBy.requestor.name);
                        console.log(joinRequest);
                        userRequestsController.requestsFor = joinRequest.data;
                    }
                },
                function (err) {
                    console.log('NO REQUEST BY USER FOUND');
                    console.log(err);
                }
            );

            userRequestsController.$http.post('/api/join-requests/searchForUser', requestBy).then(
                function (joinRequest) {
                    if (joinRequest.data.length != 0) {
                        console.log('SUCCESSFULLY LOADED EXISTING REQUESTS FOR USER:' + requestBy.receiver);
                        console.log(joinRequest);
                        var request = {};
                        request.receiver = joinRequest.data[0].receiver;
                        request.requestor = joinRequest.data[0].requestor;
                        console.log('tutaj');
                        console.log(request);
                        userRequestsController.$http.get('/api/travelroutes/' + joinRequest.data[0].route).then(
                            function (travelRouteResponse) {
                                request.route = travelRouteResponse.data;
                                console.log('tutaj2');
                                console.log(request.route);

                            },
                            function (response) {
                                console.log('FAILED TO LOAD TRAVEL ROUTE FOR ROUTE');
                                console.log(response);
                            }
                        );

                        userRequestsController.$http.get('/api/users/' + request.receiver).then(function (user) {
                            console.log('tutaj3');
                            request.receiverName = user.data.name;
                        }, function (response) {
                            console.log('FAILED TO LOAD REQUESTER FOR ROUTE ID: ' + detailController.routeId);
                            console.log(response);
                        });

                        userRequestsController.$http.get('/api/users/' + request.requestor).then(function (user) {
                            console.log('tutaj4');
                            request.requestorName = user.data.name;
                        }, function (response) {
                            console.log('FAILED TO LOAD REQUESTER FOR ROUTE ID: ' + detailController.routeId);
                            console.log(response);
                        });
                        console.log('tutaj5');
                        console.log(request);
                        userRequestsController.requestsFor.push(request);
                        console.log(userRequestsController.requestsFor);
                    }

                },
                function (err) {
                    console.log('NO REQUEST BY USER FOUND');
                    console.log(err);
                }
            );


        }

        getAlreadyRequested() {
            var userRequestsController = this;


        }


    }

    angular.module('travelWithApp')
        .component('usersJoinRequests', {
            templateUrl: 'app/users-join-requests/users-join-requests.html',
            controller: UsersJoinRequestsComponent,
            controllerAs: 'ujrc'
        })
    ;

})();
