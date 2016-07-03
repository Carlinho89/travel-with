'use strict';

(function(){

class UserDetailComponent {
  constructor($http, $scope, Auth, $stateParams) {

    this.userID = $stateParams.userID;
    this.$http = $http;
    this.$scope = $scope;
    this.$stateParams = $stateParams;
    this.user = Auth.getCurrentUser();
    console.log('id is: ' + this.userID);
    this.$scope.detailUserData = {};
    this.userHasData = false;
    this.getUserDetailData(this.userID);

  }

  getUserDetailData(userID){
    var thisRef = this;
    this.$http.get('/api/users/' + userID).then(
      function (response) {
        //success
        console.log('User data found');

        thisRef.$scope.detailUserData = response.data;
        console.log(response);
        thisRef.userHasData = true;

      },
      function (response) {
        //failure
        console.log("failure");
        console.log(response);
        alert('Error! User not found');

      }
    );

  }
}

angular.module('travelWithApp')
  .component('userDetail', {
    templateUrl: 'app/user-detail/user-detail.html',
    controller: UserDetailComponent,
    controllerAS: 'udc'
  });

})();
