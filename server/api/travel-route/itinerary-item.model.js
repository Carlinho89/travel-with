'use strict';

import mongoose from 'mongoose';
import GeoJSON from 'mongoose-geojson-schema';


export var ItineraryItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  location: {
    type: mongoose.Schema.Types.Point,
    required: true
  },
  likelihood: {
        type: String,
        enum : ['MUST','CAN', 'PROBABLYNOT'],
        default : 'MUST'
    },
});

export default mongoose.model('ItineraryItem', ItineraryItemSchema);