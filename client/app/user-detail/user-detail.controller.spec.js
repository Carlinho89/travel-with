'use strict';

describe('Component: UserDetailComponent', function () {

  // load the controller's module
  beforeEach(module('travelWithApp'));

  var UserDetailComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    UserDetailComponent = $componentController('UserDetailComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
