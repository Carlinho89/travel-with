'use strict';

describe('Component: JoinRequestComponent', function () {

  // load the controller's module
  beforeEach(module('travelWithApp'));

  var JoinRequestComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    JoinRequestComponent = $componentController('JoinRequestComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
