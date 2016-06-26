'use strict';
(function(){

class RequestsComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('travelWithApp')
  .component('requests', {
    templateUrl: 'app/requests/requests.html',
    controller: RequestsComponent
  });

})();
