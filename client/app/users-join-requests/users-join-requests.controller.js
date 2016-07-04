'use strict';
(function(){

class UsersJoinRequestsComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('travelWithApp')
  .component('usersJoinRequests', {
    templateUrl: 'app/users-join-requests/users-join-requests.html',
    controller: UsersJoinRequestsComponent
  });

})();
