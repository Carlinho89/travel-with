'use strict';
(function(){

class AddTravelRoutesComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('travelWithApp')
  .component('addTravelRoutes', {
    templateUrl: 'app/add-travel-routes/add-travel-routes.html',
    controller: AddTravelRoutesComponent
  });

})();
