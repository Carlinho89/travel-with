'use strict';

import app from '../..';
import ItineraryItem from './itinerary-item.model';
var item;

describe('Itinerary Item Model', function() {
  before(function() {
    return ItineraryItem.remove();
  });
  
  beforeEach(function()
  {
       item = new ItineraryItem();
  })

  afterEach(function() {
    return ItineraryItem.remove();
  });
  
  describe('#location', function() {
    it('should fail when saving with a null location', function() {
      item.location = null;
      return item.save().should.be.rejected;
    });
    
  });
  
  it('should succeed when all fields set', function()
  {
    item.name = 'sth';
    item.startDate = new Date(2002, 10, 2);
    item.endDate = new Date();
    item.location = {
	    type: "Point",
	    coordinates: [12.123456, 13.134578]
	  },
    item.likelihood = 'MUST';
    return item.save().should.be.fulfilled;
  });
});