'use strict';
(function () {

    class AddTravelRoutesComponent {
        constructor($http, $scope, $state, Auth, routeDetailService) {
            this.$http = $http;
            this.$state = $state;
            this.route = routeDetailService;
            $scope.fromDatePickerOpen = false;
            $scope.toDatePickerOpen = false;
            $scope.openFromDatePicker = () =>
                $scope.fromDatePickerOpen = true;
            $scope.openToDatePicker = () =>
                $scope.toDatePickerOpen = true;
            $scope.dateOptions = {
                formatYear: 'yy',
                maxDate: new Date(2020, 5, 22),
                minDate: new Date(),
                startingDay: 1
            };
            // model for travel route
            this.travelRequest = {};
            this.travelRequest.title = '';
            this.travelRequest.description = '';
            this.travelRequest.requestor = Auth.getCurrentUser();

            $scope.itineraryItems = [];
            $scope.newItem = {
                name: '',
                location: {
                    type: 'Point',
                    coordinates: [12.123456, 13.134578]
                },
                startDate: null,
                endDate: null
            };

            this.travelRequest.getDTO = function () {
                return {
                    title: this.title,
                    description: this.description,
                    itinerary: $scope.itineraryItems,
                    requestor: this.requestor
                };
            };
            $scope.addNewStop = function () {
                $scope.itineraryItems.push($scope.newItem);
                console.log($scope.newItem);
                $scope.newItem = {
                    name: '',
                    location: {
                        type: 'Point',
                        coordinates: [12.123456, 13.134578]
                    },
                    startDate: null,
                    endDate: null
                };
                console.log($scope.itineraryItems);
            };
        }


        createRequest() {
            var travelRouteCtrl = this;
            var request = this.travelRequest.getDTO();
            var state = this.$state;
            console.log('current user is: ');
            console.log(request.requestor);
            console.log(request);

            this.$http.post('/api/travelroutes', request).then(
                function (response) {
                    console.log('successful POST TravelRoute');
                    console.log(response);
                    //travelRouteCtrl.route.setId(response._id);
                    console.log(response.data._id);
                    state.go('travel-route-detail', {routeId: response.data._id});
                    //travelRouteCtrl.routeId = response._id

                },
                function (response) {
                    console.log('error');
                    console.log(response);
                    return response.data;
                    // failure callback
                }
            );

        }
    }

    angular.module('travelWithApp')
        .component('addTravelRoutes', {
            templateUrl: 'app/add-travel-routes/add-travel-routes.html',
            controller: AddTravelRoutesComponent,
            controllerAs: 'arc'
        });

})();
