'use strict';
(function () {

    class JoinRequestComponent {
        constructor($http, $state, Auth) {
            this.$http = $http;
            this.$state = $state;
            this.auth = Auth;
            this.routeId = '577908c96562369818743377';
            //this.routeId = $state.params.routeId;
            this.travelRoute = {};
            this.author = {};
            this.participants = [];
            this.user = Auth.getCurrentUser();
            this.participating = false;
            var joinCtrl = this;

            $http.get('/api/travelroutes/' + joinCtrl.routeId).then(
                function (travelRouteResponse) {
                    joinCtrl.travelRoute = travelRouteResponse.data;
                    console.log('ROUTE ATTENDED TO JOIN');
                    console.log(joinCtrl.travelRoute);
                    $http.get('/api/users/' + travelRouteResponse.data.requestor).then(function (user) {
                        joinCtrl.author = user.data;
                        console.log('REQUESTER FOR ROUTE:');
                        console.log(joinCtrl.author);
                    }, function (response) {
                        console.log('FAILED TO LOAD REQUESTER FOR ROUTE ID: ' + joinCtrl.routeId);
                        console.log(response);
                    });
                },
                function (response) {
                    console.log('FAILED TO LOAD TRAVEL ROUTE FOR ROUTE ID: ' + joinCtrl.routeId);
                    console.log(response);
                }
            );

        }

        joinRoute() {
            this.travelRoute.travellers.push(this.auth.getCurrentUser()._id)
            console.log('Updated Travel Route Object:');
            console.log(this.travelRoute);
            var joinCtrl = this;
            this.$http.put('/api/travelroutes/' + this.travelRoute._id, this.travelRoute).then(function (updatedRoute) {
                joinCtrl.travelRoute = updatedRoute.data;
                console.log('UPDATING TRAVEL ROUTE SUCCEDED. UPDATED OBJECT:');
                console.log(joinCtrl.travelRoute);
                joinCtrl.participating = true;
            }, function (err) {
                console.log('UPDATING TRAVEL ROUTE FAILED');
                console.log(err);
            });
        }

        back(){
            this.$state.go('travel-route-detail', {routeId: this.travelRoute._id});
        }
    }

    angular.module('travelWithApp')
        .component('joinRequest', {
            templateUrl: 'app/join-request/join-request.html',
            controller: JoinRequestComponent,
            controllerAs: 'jrc'
        });

})();
