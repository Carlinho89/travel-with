'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN:           'http://localhost:9000',
  SESSION_SECRET:   'travelwith-secret',

  FACEBOOK_ID:      '1719798044935918',
  FACEBOOK_SECRET:  '23fd6ff571753a795a68ff47919ec4dd',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
