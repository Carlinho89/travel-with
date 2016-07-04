'use strict';
(function () {

    class AddTravelRoutesComponent {
        constructor($http, $scope, $state, Auth) {
            this.$http = $http;
            this.$state = $state;
            this.$scope = $scope;
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
            this.currentStopName = '';
            this.currentLocation = null;
            this.currentStartDate = new Date();
            this.currentEndDate = new Date();
            this.currentLikelihood = "It's a Must!";
            this.likelihood = '';
            this.likelihoodOptions = [
                "It's a Must!",
                "Can be included, doesn't has to",
                "Probably not included, but negotiable!"
            ];


            $scope.itineraryItems = [];
            this.getItineraryItem = function(){
                if(this.currentLikelihood == "It's a Must!"){
                    this.likelihood = 'MUST';
                } else if(this.currentLikelihood == "Can be included, doesn't has to"){
                    this.likelihood = 'CAN';
                } else if(this.currentLikelihood == "Probably not included, but negotiable!"){
                    this.likelihood = 'PROBABLYNOT';
                }
                return {
                    name: this.currentStopName,
                    location: {
                        type: 'Point',
                        coordinates: [this.currentLocation.geometry.location.lat(), this.currentLocation.geometry.location.lng()]
                    },
                    place: this.currentLocation.name,
                    startDate: this.currentStartDate,
                    endDate: this.currentEndDate,
                    likelihood: this.likelihood
                };
            }

            this.travelRequest.getDTO = function () {
                return {
                    name: this.title,
                    description: this.description,
                    itinerary: $scope.itineraryItems,
                    requestor: this.requestor,
                    travellers: []
                };
            };

        }

        deleteStop(index) {
            console.log('items before deletion:');
            console.log(this.$scope.itineraryItems);
            this.$scope.itineraryItems.splice(index, 1);
            console.log('items after deletion:');
            console.log(this.$scope.itineraryItems);
        };

        addNewStop() {
            console.log('CURRENT ITINERARY ITEM');
            console.log(this.getItineraryItem());
            console.log(this.getItineraryItem().location);
            this.$scope.itineraryItems.push(this.getItineraryItem());
            console.log('UPDATED ITINERARY LIST');
            console.log(this.$scope.itineraryItems);
            this.currentLocation = null;
            this.currentStopName = '';
            this.currentStartDate = null;
            this.currentEndDate = null;
        };

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
