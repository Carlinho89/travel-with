'use strict';
(function(){

class ListTravelRoutesComponent {
    constructor($http, $scope, Auth) {
      this.$http = $http;

      var userID = Auth.getCurrentUser();

      var parameters = {
        us_id: userID._id
      };
      var config = {
        params: parameters
      };
      this.$http.get('/api/travelroutes/usr_trips/'+ userID._id).then(
        function(response){
          // success callback
          console.log('successful search pongo');
          console.log(response);
          return null;
        },
        function(response){
          console.log('error');
          console.log('nope: ');
          console.log(response);
          return null;
          // failure callback
        }
      );
    }
  }

angular.module('travelWithApp')
  .component('listTravelRoutes', {
    templateUrl: 'app/list-travel-routes/list-travel-routes.html',
    controller: ListTravelRoutesComponent,
    controllerAs: 'ltc'
  });

})();
