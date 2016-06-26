'use strict';

(function() {

  class LandingSearchController {

    constructor($http, $scope) {
      this.model = {};
      this.$http = $http;
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

      this.model.GetDTO = function(){
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


    search(){
      console.log('Search Made');

      this.$http.post('/api/travelroutes/search', this.model.GetDTO())
      .then(
        function(response){
          // success callback
          this.hasSearched = true;
          console.log('successful search pongo');
          console.log(response);
          return response.data;
        },
        function(response){
          console.log('error');
          console.log('nope: ' + response);
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
