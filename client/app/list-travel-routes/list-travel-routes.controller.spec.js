'use strict';

describe('Component: ListTravelRoutesComponent', function () {

  // load the controller's module
  beforeEach(module('travelWithApp'));

  var ListTravelRoutesComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    ListTravelRoutesComponent = $componentController('ListTravelRoutesComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
