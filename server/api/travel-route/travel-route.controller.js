'use strict';

import _ from 'lodash';
import TravelRoute from './travel-route.model';
import User from '../user/user.model';


var ObjectId = require('mongodb').ObjectID;

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Things
export function index(req, res) {
  return TravelRoute.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}
export function search(req, res) {

  return TravelRoute.find({itinerary: {$elemMatch : { startDate : {$gte: req.body.startingDate}}}}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}
// Gets a single Thing from the DB
export function show(req, res) {
  return TravelRoute.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Thing in the DB
export function create(req, res) {
  console.log('creating post request:');
  console.log(req);

  return TravelRoute.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Thing in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return TravelRoute.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Thing from the DB
export function destroy(req, res) {
  return TravelRoute.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// Get all TravelRouths of the current user

export function getUserTravelRoutes(req, res) {

  var userID = ObjectId(req.params.us_id);

  return TravelRoute.find({
    'requestor': userID
  }).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}
//Get All users of a travel route
export function getTravelRoutesTravellers(req, res) {
  var tr_id = ObjectId(req.params.tr_id);
  console.log(tr_id);
  var travelRoute = {};

  TravelRoute.find({"_id": tr_id})
    .exec(function (err, tr) {
      if (err) return handleError(err);
      else {
        travelRoute = tr;
      }
  });

  console.log(travelRoute);
  //                                                  .then(respondWithResult(res))
  //                                                  .catch(handleError(res));;
  var travellers = [];

  //console.log(travelRoute);

  travelRoute.travellers.forEach(function (traveller_id) {
    var tr_id = ObjectId(traveller_id);
    var traveller;
    User.find({'_id' : tr_id})
      .exec(function (err, traveller) {
        if (err) return handleError(err);
        travellers.push(tr);

      });
  });
  console.log(travellers);

  return travellers;
}
