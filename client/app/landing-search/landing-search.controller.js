'use strict';

(function () {

    class LandingSearchController {

        constructor($http, $scope, $state) {

            this.itineraryItems = [];

            this.model = {};
            this.$http = $http;
            this.state = $state;
            $scope.fromDatePickerOpen = false;
            $scope.toDatePickerOpen = false;
            this.model.startingDate = new Date;
            this.model.toDate = new Date;
            $scope.openFromDatePicker = () => $scope.fromDatePickerOpen = true;
            $scope.openToDatePicker = () => $scope.toDatePickerOpen = true;
            $scope.dateOptions = {
                formatYear: 'yy',
                maxDate: new Date(2020, 5, 22),
                minDate: new Date,
                startingDay: 1
            };
            this.model.destination = null;

            this.model.GetDTO = function () {
                return {
                    startingDate: this.startingDate,
                    toDate: this.toDate,
                    location: {
                        lat: this.destination.geometry.location.lat(),
                        lon: this.destination.geometry.location.lng(),
                        name: this.destination.name
                    }
                };
            };

            this.hasSearched = false;

        }

        showDetails(index){
            var clickedRoute = this.itineraryItems[index].routeId;
            this.state.go('travel-route-detail', {routeId: clickedRoute});
    };


        search() {
            console.log('Search Made');
            this.hasSearched = true;
            console.log(this.hasSearched);
            var landingSearchCtrl = this;
            this.$http.post('/api/travelroutes/search', this.model.GetDTO())
                .then(
                    function (response) {
                        console.log('response');
                        console.log(response.data);
                        angular.forEach(response.data, function (travelRoute) {
                            console.log('Travel Route:');
                            console.log(travelRoute);
                            angular.forEach(travelRoute.itinerary, function (itineraryItem) {
                                var item = {};
                                item.name = itineraryItem.name;
                                item.startDate = itineraryItem.startDate;
                                item.endDate = itineraryItem.endDate;
                                item.likelihood = itineraryItem.likelihood;
                                item.routeId = travelRoute._id;
                                item.routeName = travelRoute.name;
                                landingSearchCtrl.itineraryItems.push(item);
                                console.log('Itinerary Item:');
                                console.log(itineraryItem);

                            });

                        });

                        // success callback


                        return response.data;
                    },
                    function (response) {
                        console.log('error')
                        return response.data;
                        // failure callback
                    }
                );
        }

    }

    angular.module('travelWithApp')
        .component('landingSearch', {
            templateUrl: 'app/landing-search/landing-search.html',
            controller: LandingSearchController,
            controllerAs: 'vm'
        });
})();
