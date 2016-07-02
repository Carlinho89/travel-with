'use strict';

import mongoose from 'mongoose';
var MessageSchema = new mongoose.Schema({
 from: String,
  message: String
});

export default mongoose.model('Message', MessageSchema);
