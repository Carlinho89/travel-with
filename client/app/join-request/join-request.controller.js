'use strict';
(function(){

class JoinRequestComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('travelWithApp')
  .component('joinRequest', {
    templateUrl: 'app/join-request/join-request.html',
    controller: JoinRequestComponent
  });

})();
