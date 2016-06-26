'use strict';

describe('Component: RequestsComponent', function () {

  // load the controller's module
  beforeEach(module('travelWithApp'));

  var RequestsComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    RequestsComponent = $componentController('RequestsComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
