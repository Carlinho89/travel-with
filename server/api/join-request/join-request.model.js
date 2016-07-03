'use strict';

import mongoose from 'mongoose';


var JoinRequestSchema = new mongoose.Schema({
    requestor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    route: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'TravelRoute'
    }
});

export default mongoose.model('JoinRequest', JoinRequestSchema);
