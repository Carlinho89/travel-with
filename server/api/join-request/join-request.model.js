'use strict';

import mongoose from 'mongoose';

var JoinRequestSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('JoinRequest', JoinRequestSchema);
