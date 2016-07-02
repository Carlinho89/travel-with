'use strict';
(function () {

    class ListTravelRoutesComponent {

        constructor($http, $scope, Auth) {
            this.$http = $http;
            this.$scope = $scope;
            this.user = Auth.getCurrentUser();
            this.user.travelroutes = [];
            this.hasTravRout = false;
            this.user.travellers = [];
            this.getUserTravelRoutes(this.user._id);
        }

        getUserTravelRoutes(user_id) {
            var thisRef = this;
            this.$http.get('/api/travelroutes/usr_trips/' + user_id).then(
                function (response) {
                    // success callback
                    console.log('user has travel routes');
                    console.log(response);
                    thisRef.hasTravRout = true;
                    thisRef.user.travelroutes = response.data;
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
            thisRef.user.travelroutes.forEach(function (tr) {
                console.log('in 1');
                console.log('travelroute name: ' + tr.name);
                thisRef.$http.get('/api/travelroutes/travellers/' + tr._id).then(
                    function (response) {
                        //success
                        console.log("success");
                        console.log(response);
                        tr.travellers = response.data;
                        thisRef.user.travellers = tr.travellers
                        console.log("thisRef:");
                        console.log(thisRef);
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
        console.log('Delete travel route ' + this.user.travelroutes[index].name + ' at index: ' + index);
        var trName = this.user.travelroutes[index].name;
        var thisRef = this;

        this.$http.delete('/api/travelroutes/' + this.user.travelroutes[index]._id)
          .success(function(){
            console.log('Travel route ' + trName + '  at index: ' + index + ' was deleted');

            thisRef.user.travelroutes.splice(index, 1);
          })
          .error(function(err){
            alert('Error! Travel route ' + trName + ' was not deleted');
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
