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
            this.getUserAsTravellerTravelRoutes(this.user._id);
            this.getUserOrganizedTravelRoutes(this.user._id);

        }

        getUserOrganizedTravelRoutes(user_id) {
            var thisRef = this;
            this.$http.get('/api/travelroutes/usr_trips/' + user_id).then(
                function (response) {
                    // success callback
                    //console.log(response);
                    thisRef.isOrganizer = (response.data.length > 0) ? true : false;
                    console.log('user has travel routes: '+ thisRef.isOrganizer);

                    thisRef.user.travelroutesAsOrganizer = response.data;
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
            thisRef.user.travelroutesAsOrganizer.forEach(function (tr) {
                thisRef.$http.get('/api/travelroutes/travellers/' + tr._id).then(
                    function (response) {
                        //success
                        console.log("success");
                        //console.log(response);
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

      deleteTravelRoute(index){
        console.log('Delete travel route ' + this.user.travelroutesAsOrganizer[index].name + ' at index: ' + index);
        var trName = this.user.travelroutesAsOrganizer[index].name;
        var thisRef = this;

        this.$http.delete('/api/travelroutes/' + this.user.travelroutesAsOrganizer[index]._id)
          .success(function(){
            console.log('Travel route ' + trName + '  at index: ' + index + ' was deleted');

            thisRef.user.travelroutesAsOrganizer.splice(index, 1);
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
            console.log('user is traveller: ' + thisRef.isTraveller);
            //thisRef.getTravelers(thisRef);
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

        this.$http.put('/api/travelroutes/' + travelroute._id, travelroute)
          .then(
            function(response){
              // success callback
              console.log('Travel route ' + travelroute.name + ' was updated');

              thisRef.user.travelroutesAsTraveller.splice(index, 1);
            },
            function(response){
              alert('Error! Travel route ' + travelroute.name + ' was not updated');
            }
          );/*
        this.$http.put('/api/travelroutes/' + travelroute._id, travelroute).success(function(response){
          console.log('Travel route ' + travelroute.name + ' was updated');

          thisRef.user.travelroutesAsTraveller.splice(index, 1);
        })
          .error(function(err){
            alert('Error! Travel route ' + travelroute.name + ' was not updated');
          });*/
      }
    }


    angular.module('travelWithApp')
        .component('listTravelRoutes', {
            templateUrl: 'app/list-travel-routes/list-travel-routes.html',
            controller: ListTravelRoutesComponent,
            controllerAs: 'ltc'
        });

})();
