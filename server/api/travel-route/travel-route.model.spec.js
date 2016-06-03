'use strict';

import app from '../..';
import TravelRoute from './travel-route.model';
import ItineraryItem from './itinerary-item.model';

function GenerateItineraryItem()
{
    return new ItineraryItem({
          name: "one",
          location: {
            type: "Point",
            coordinates: [12.123456, 13.134578]
          }
      });
}

describe('Travel Route Model', function() {
    var travelRoute;
  before(function() {
    // Clear routes before testing
    return TravelRoute.remove();
  });
  beforeEach(function()
  {
      travelRoute = new TravelRoute({
          name: 'travel somewhere',
          description: 'with me'          
      });
  })

  afterEach(function() {
    return TravelRoute.remove();
  });

  describe('#itinerary', function() {
   it('should fail when saving with no itinerary', function() {
    return travelRoute.save().should.be.rejected;
  });
  
  it('should fail when saving overlapping itinerary items', function()
  {
      let item1 = GenerateItineraryItem();
      item1.startDate = new Date(2010, 1, 1);
      item1.endDate = new Date(2010, 2, 1);
      let item2 =  GenerateItineraryItem();
      item2.startDate = new Date(2010, 1, 10);
      item2.endDate = new Date(2010, 2, 20);
      
      travelRoute.itinerary = [item1, item2];
      return travelRoute.save().should.be.rejected;
  })
  it('should succeed when saving consecutive non-overlapping itinerary items', function()
  {
      let item1 = GenerateItineraryItem();
      item1.startDate = new Date(2010, 1, 1);
      item1.endDate = new Date(2010, 2, 1);
      let item2 =  GenerateItineraryItem();
      item2.startDate = new Date(2010, 2, 1);
      item2.endDate = new Date(2010, 2, 20);
  
      travelRoute.itinerary = [item1, item2];
      return travelRoute.save().should.be.fulfilled;
  })
});

});