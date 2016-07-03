'use strict';

import mongoose from 'mongoose';

var JoinRequestSchema = new mongoose.Schema({
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

});

export default mongoose.model('JoinRequest', JoinRequestSchema);
