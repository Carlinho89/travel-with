'use strict';
(function () {

    class RequestsComponent {
        constructor($http, $scope) {
            this.travelRequest = {};
            this.$http = $http;
            $scope.fromDatePickerOpen = false;
            $scope.toDatePickerOpen = false;
            this.travelRequest.startingDate = new Date;
            this.travelRequest.toDate = new Date;
            $scope.openFromDatePicker = () => $scope.fromDatePickerOpen = true;
            $scope.openToDatePicker = () => $scope.toDatePickerOpen = true;
            $scope.dateOptions = {
                formatYear: 'yy',
                maxDate: new Date(2020, 5, 22),
                minDate: new Date,
                startingDay: 1
            };
            this.travelRequest.destination = null;
            this.travelRequest.GetDTO = function () {
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
        }
    }

    angular.module('travelWithApp')
        .component('requests', {
            templateUrl: 'app/requests/requests.html',
            controller: RequestsComponent,
            controllerAs: 'rc'
        });

})();
