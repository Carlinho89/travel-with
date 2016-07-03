/**
 * JoinRequest model events
 */

'use strict';

import {EventEmitter} from 'events';
import JoinRequest from './join-request.model';
var JoinRequestEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
JoinRequestEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  JoinRequest.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    JoinRequestEvents.emit(event + ':' + doc._id, doc);
    JoinRequestEvents.emit(event, doc);
  }
}

export default JoinRequestEvents;
