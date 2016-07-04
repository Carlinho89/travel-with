'use strict';

describe('Component: UsersJoinRequestsComponent', function () {

  // load the controller's module
  beforeEach(module('travelWithApp'));

  var UsersJoinRequestsComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    UsersJoinRequestsComponent = $componentController('UsersJoinRequestsComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
