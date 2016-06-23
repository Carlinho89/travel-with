'use strict';

import mongoose from 'mongoose';
import {ItineraryItemSchema} from './itinerary-item.model'
var TravelRouteSchema = new mongoose.Schema({
  name: String,
  description: String,
  itinerary: {
    type: [ItineraryItemSchema],
    required: true
  }
});
/*
TravelRouteSchema
  .path('itinerary')
  .validate(function(arr) {
    return arr != null && arr.length;
  }, 'itinerary cannot empty');*/
export default mongoose.model('TravelRoute', TravelRouteSchema);