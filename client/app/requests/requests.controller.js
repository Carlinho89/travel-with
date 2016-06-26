'use strict';
(function () {

    class RequestsComponent {
        constructor($http, $scope, Auth) {
            this.$http = $http;
            $scope.fromDatePickerOpen = false;
            $scope.toDatePickerOpen = false;
            $scope.openFromDatePicker = () => $scope.fromDatePickerOpen = true;
            $scope.openToDatePicker = () => $scope.toDatePickerOpen = true;
            $scope.dateOptions = {
                formatYear: 'yy',
                maxDate: new Date(2020, 5, 22),
                minDate: new Date,
                startingDay: 1
            };
            // model for travel route
            this.travelRequest = {};
            this.travelRequest.title = "";
            this.travelRequest.description = "";
            this.travelRequest.requestor = Auth.getCurrentUser;
            this.travelRequest.itineraryItems = [];
            // model for itinerary item
            $scope.itineraryItem = {};
            $scope.itineraryItem.name = "";
            $scope.itineraryItem.startDate = new Date;
            $scope.itineraryItem.endDate = new Date;
            this.travelRequest.GetDTO = function () {
                return {
                    startDate: this.startDate,
                    endDate: this.endDate,
                    itineraryItems: [
                        {
                            name: $scope.itineraryItem.name,
                            startDate: $scope.itineraryItem.startDate,
                            endDate: $scope.itineraryItem.endDate,
                            location: {
                                type: "Point",
                                coordinates: [12.123456, 13.134578]
                            },
                            likelihood: 'CAN'
                        }
                    ]

                }
                    ;
            };
        }

        createRequest() {
            console.log(this.travelRequest.title);
            console.log(this.travelRequest.description);
            console.log(this.travelRequest.requestor.name);
            console.log($scope.itineraryItem.startDate);
            console.log($scope.itineraryItem.endDate);
        }
    }

    angular.module('travelWithApp')
        .component('requests', {
            templateUrl: 'app/requests/requests.html',
            controller: RequestsComponent,
            controllerAs: 'rc'
        });

})();
