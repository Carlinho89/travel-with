'use strict';

(function() {

  class LandingSearchController {

    constructor($http, $scope) {
      this.$http = $http;
      $scope.fromDatePickerOpen = false;
      $scope.toDatePickerOpen = false;
      $scope.startingDate = new Date();
      $scope.toDate = new Date();
      $scope.openFromDatePicker = () => $scope.fromDatePickerOpen = true;
      $scope.openToDatePicker = () => $scope.toDatePickerOpen = true;
      $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
      };
    }
    
    
    // $onInit() {
    //   this.$http.get('/api/things')
    //     .then(response => {
    //       this.awesomeThings = response.data;
    //     });
    // }

  }

  angular.module('travelWithApp')
    .component('landingSearch', {
      templateUrl: 'app/landing-search/landing-search.html',
      controller: LandingSearchController
    });
})();
