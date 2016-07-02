'use strict';
(function () {

    class ListTravelRoutesComponent {

        constructor($http, $scope, Auth) {
            this.$http = $http;
            this.$scope = $scope;
            this.$scope.user = Auth.getCurrentUser();
            //TravelRoutes as Organizer
            this.$scope.user.travelroutesAsOrganizer = [];
            //TravelRoutes as Traveller
            this.$scope.user.travelroutesAsTraveller = [];
            this.isOrganizer = false;
            this.isTraveller = false;
            this.$scope.user.travellers = [];
            console.log(this);
            this.getUserOrganizedTravelRoutes(this.$scope.user._id);
            this.getUserAsTravellerTravelRoutes(this.$scope.user._id);
        }

        getUserOrganizedTravelRoutes(user_id) {
            var thisRef = this;
            this.$http.get('/api/travelroutes/usr_trips/' + user_id).then(
                function (response) {
                    // success callback
                    //console.log(response);
                    thisRef.isOrganizer = (response.data.length > 0) ? true : false;
                    console.log('user has travel routes: '+ thisRef.isOrganizer);

                    thisRef.$scope.user.travelroutesAsOrganizer = response.data;
                    thisRef.getTravelers(thisRef);

                },
                function (response) {
                    console.log('error');
                    console.log(response);

                  // failure callback
                }
            );
        }

        getTravelers(thisRef) {
            thisRef.$scope.user.travelroutesAsOrganizer.forEach(function (tr) {
                thisRef.$http.get('/api/travelroutes/travellers/' + tr._id).then(
                    function (response) {
                        //success
                        console.log("success");
                        //console.log(response);
                        tr.travellers = response.data;
                        thisRef.$scope.user.travellers = tr.travellers

                    },
                    function (response) {
                        //failure
                        console.log("failure");
                        console.log(response);
                    }
                );
            });
        }

      deleteTravelRoute(index){
        console.log('Delete travel route ' + this.$scope.user.travelroutesAsOrganizer[index].name + ' at index: ' + index);
        var trName = this.$scope.user.travelroutesAsOrganizer[index].name;
        var thisRef = this;

        this.$http.delete('/api/travelroutes/' + this.$scope.user.travelroutesAsOrganizer[index]._id)
          .success(function(){
            console.log('Travel route ' + trName + '  at index: ' + index + ' was deleted');

            thisRef.$scope.user.travelroutesAsOrganizer.splice(index, 1);
            thisRef.isOrganizer = (thisRef.$scope.user.travelroutesAsOrganizer.length > 0) ? true : false;

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
            thisRef.$scope.user.travelroutesAsTraveller = response.data;
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
        var travelroute = this.$scope.user.travelroutesAsTraveller[index];
        var idAtIndex = travelroute.travellers.indexOf(this.$scope.user._id);
        travelroute.travellers.splice(idAtIndex,1);

        this.$http.put('/api/travelroutes/' + travelroute._id, travelroute)
          .then(
            function(response){
              // success callback
              console.log('Travel route ' + travelroute.name + ' was updated');
              thisRef.$scope.user.travelroutesAsTraveller.splice(index, 1);
              thisRef.isTraveller = (thisRef.$scope.user.travelroutesAsTraveller.length > 0) ? true : false;
            },
            function(response){
              alert('Error! Travel route ' + travelroute.name + ' was not updated');
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
