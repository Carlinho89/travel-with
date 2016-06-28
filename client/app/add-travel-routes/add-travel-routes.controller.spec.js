'use strict';

describe('Component: AddTravelRoutesComponent', function () {

  // load the controller's module
  beforeEach(module('travelWithApp'));

  var AddTravelRoutesComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    AddTravelRoutesComponent = $componentController('AddTravelRoutesComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
