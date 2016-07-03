'use strict';

class MessagesController {
  //end-non-standard

  constructor(Auth, $state,$http, $scope) {
    this.Auth = Auth;
    this.$state = $state;
    this.$http = $http;
    this.model={};
    this.model.from="You";// need to retrieve this from fb user login

    this.messageData=[];

    this.model.GetDTO = function(){

      return {
        from: this.from,
        message:this.message
    }


  }
  //start-non-standard



}
  addMessage() {
    var MessagesCtrl=this;
    this.messageAdded = true;
console.log('message sent');
    this.$http.post('/api/messages/add', this.model.GetDTO())
      .then(
        function(response){
          console.log('message added');
          MessagesCtrl.getMessages();


          return response.data;
        },
        function(response){
          console.log('error');
          return response.data;
          // failure callback
        }
      );

  }
  getMessages()
  {var thisScope=this;
    this.messageData=[];
    this.$http.get('/api/messages/')
      .then(
        function(response){
          console.log('message added');
          angular.forEach(response.data, function(item) {
    thisScope.messageData.push(item);
              });

//define getMessages();


          return response.data;
        },
        function(response){
          console.log('error');
          return response.data;
          // failure callback
        }
      );
  }
}

angular.module('travelWithApp')
  .controller('MessagesController', MessagesController);
