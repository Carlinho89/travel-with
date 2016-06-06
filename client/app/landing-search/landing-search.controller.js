'use strict';

(function() {

  class LandingSearchController {

    constructor($http, $scope) {

      this.mockData = [
        { organizer: 'Pavel S.',
          travelers:['Filip Toll', 'Bob Smith', 'Andrea Agnelli'],
          dates : [new Date("10-6-16"), new Date("10-16-16")]
        },
        { organizer: 'Carlo Di Domenico',
          travelers:['John Doe', 'Max Powers', 'Enricos De Rios'],
          dates : [new Date("10-7-16"), new Date("10-14-16")]
        },
        { organizer: 'Maja May',
          travelers:['Marius Deam', 'Francis La Porta'],
          dates : [new Date("10-7-16"), new Date("10-12-16")]
        },
        {
          organizer: 'Dann Oliver',
          travelers: ['John Doe', 'Max Powers', 'Andrea Agnelli'],
          dates: [new Date("10-8-16"), new Date("10-18-16")]
        }
      ];

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
          lon: this.destination.geometry.location.lon(),
          name: this.destination.name
        }
      };
      };
      this.hasSearched = false;

    }


    search(){
      console.log('Search');
      this.hasSearched = true;
      console.log(this.mockData);


      //  this.$http.post('/api/travelroutes/search', this.model.GetDTO());
    //     .then(response => {
    //       ... = response.data;
    //     });
    // }
    }

  }

  angular.module('travelWithApp')
    .component('landingSearch', {
      templateUrl: 'app/landing-search/landing-search.html',
      controller: LandingSearchController,
      controllerAs: 'vm'
    });
})();
