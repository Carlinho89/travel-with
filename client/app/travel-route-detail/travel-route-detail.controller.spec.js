'use strict';

describe('Component: TravelRouteDetailComponent', function () {

  // load the controller's module
  beforeEach(module('travelWithApp'));

  var TravelRouteDetailComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    TravelRouteDetailComponent = $componentController('TravelRouteDetailComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
