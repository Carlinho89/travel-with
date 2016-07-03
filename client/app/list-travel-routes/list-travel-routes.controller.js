'use strict';
(function () {

    class ListTravelRoutesComponent {

        constructor($http, $scope, Auth) {
            this.$http = $http;
            this.$scope = $scope;
            this.user = Auth.getCurrentUser();
            //TravelRoutes as Organizer
            this.user.travelroutesAsOrganizer = [];
            //TravelRoutes as Traveller
            this.user.travelroutesAsTraveller = [];
            this.isOrganizer = false;
            this.isTraveller = false;
            this.user.travellers = [];
            console.log(this);
            this.getUserAsRequestorTravelRoutes(this.user._id);
            this.getUserAsTravellerTravelRoutes(this.user._id);
        }

        getUserAsRequestorTravelRoutes(user_id) {
            var thisRef = this;
            this.$http.get('/api/travelroutes/usr_trips/' + user_id).then(
                function (response) {
                    // success callback
                    //console.log(response);
                    thisRef.isOrganizer = (response.data.length > 0) ? true : false;
                    console.log('user has travel routes: '+ thisRef.isOrganizer);

                    thisRef.user.travelroutesAsOrganizer = response.data;
                    thisRef.getTravellers(thisRef.user.travelroutesAsOrganizer);

                },
                function (response) {
                    console.log('error');
                    console.log(response);

                  // failure callback
                }
            );
        }

      deleteTravelRoute(index){
        console.log('Delete travel route ' + this.user.travelroutesAsOrganizer[index].name + ' at index: ' + index);
        var trName = this.user.travelroutesAsOrganizer[index].name;
        var thisRef = this;

        this.$http.delete('/api/travelroutes/' + this.user.travelroutesAsOrganizer[index]._id)
          .success(function(){
            console.log('Travel route ' + trName + '  at index: ' + index + ' was deleted');

            thisRef.user.travelroutesAsOrganizer.splice(index, 1);
            thisRef.isOrganizer = (thisRef.user.travelroutesAsOrganizer.length > 0) ? true : false;

          })
          .error(function(err){
            alert('Error! Travel route ' + trName + ' was not deleted');
          });
      }

      getUserAsTravellerTravelRoutes(user_id){
        var thisRef = this;
        this.$http.get('/api/travelroutes/astraveller/' + user_id).then(
          function (response) {
            // success callback
            console.log(response);
            thisRef.isTraveller = (response.data.length > 0) ? true : false;
            thisRef.user.travelroutesAsTraveller = response.data;
            thisRef.getTravellers(thisRef.user.travelroutesAsTraveller);
            thisRef.getOrganizer(thisRef.user.travelroutesAsTraveller);
            console.log('user is traveller: ' + thisRef.isTraveller);

          },
          function (response) {
            console.log('error');
            console.log(response);
            // failure callback
          }
        );

      }

      unsubscribeFromTravelRoute(index){
        var thisRef = this;
        var travelroute = this.user.travelroutesAsTraveller[index];
        var idAtIndex = travelroute.travellers.indexOf(this.user._id);
        travelroute.travellers.splice(idAtIndex,1);

        this.$http.put('/api/travelroutes/' + travelroute._id, travelroute)
          .then(
            function(response){
              // success callback
              console.log('Travel route ' + travelroute.name + ' was updated');
              thisRef.user.travelroutesAsTraveller.splice(index, 1);
              thisRef.isTraveller = (thisRef.user.travelroutesAsTraveller.length > 0) ? true : false;
            },
            function(response){
              alert('Error! Travel route ' + travelroute.name + ' was not updated');
            }
          );
      }

      getTravellers(travelRoutes) {
        var thisRef = this;
        travelRoutes.forEach(function (tr) {
          thisRef.$http.get('/api/travelroutes/travellers/' + tr._id).then(
            function (response) {
              //success
              console.log("get travellers success");
              tr.travellers = response.data;
              thisRef.user.travellers = tr.travellers

            },
            function (response) {
              //failure
              console.log("failure");
              console.log(response);
            }
          );
        });
      }

      getOrganizer(travelRoutes) {
        var thisRef = this;
        travelRoutes.forEach(function (tr) {
          thisRef.$http.get('/api/travelroutes/organizer/' + tr._id).then(
            function (response) {
              //success
              console.log("get travellers success for " + tr.name);
              console.log(response.data);
              tr.requestor = response.data;
              thisRef.user.travellers = tr.travellers

            },
            function (response) {
              //failure
              console.log("failure");
              console.log(response);
            }
          );
        });
      }
    }


    angular.module('travelWithApp')
        .component('listTravelRoutes', {
            templateUrl: 'app/list-travel-routes/list-travel-routes.html',
            controller: ListTravelRoutesComponent,
            controllerAs: 'ltc'
        });

})();
