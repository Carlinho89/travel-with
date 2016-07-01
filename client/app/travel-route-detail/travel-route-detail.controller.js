'use strict';
(function(){

class TravelRouteDetailComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('travelWithApp')
  .component('travelRouteDetail', {
    templateUrl: 'app/travel-route-detail/travel-route-detail.html',
    controller: TravelRouteDetailComponent
  });

})();
