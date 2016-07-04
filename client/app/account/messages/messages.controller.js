'use strict';

class MessagesController {
  //end-non-standard

  constructor(Auth, $state,$http, $scope, $timeout) {
    this.Auth = Auth;
    this.$state = $state;
    this.$http = $http;
    this.$timeout = $timeout;
    this.model={};
    this.model.from=Auth.getCurrentUser().name;// need to retrieve this from fb user login

    console.log("here");
    this.messageData=[];
    this.model.message='';
    this.model.GetDTO = function(){ 
        return {
          from: this.from,
          message:this.message
      }
    }
    this.pollGetMessages();


}
  addMessage() {
    var thisScope=this;
    this.messageAdded = true;
console.log('message sent');
    console.log(this.Auth.getCurrentUser().name);
    this.$http.post('/api/messages/add', this.model.GetDTO())
      .then(
        function(response){
          console.log('message added');
          thisScope.getMessages();


          return response.data;
        },
        function(response){
          console.log('error');
          return response.data;
          // failure callback
        }
      );

  }
  pollGetMessages()
  {
    var self = this;
    console.log(self.pollGetMessages);
        this.getMessages(function(){
            self.$timeout(self.pollGetMessages.bind(self), 500);
        });
  }
  getMessages(callback)
  {
    var self = this;

    this.$http.get('/api/messages/')
      .then(
        function(response){
          console.log('message added');
          self.messageData = response.data;
          if (callback)
          {
            callback();
          }
        },
        function(response){
          console.log('error')
          return response.data;
          // failure callback
        }
      );
  }
}

angular.module('travelWithApp')
  .controller('MessagesController', MessagesController);
