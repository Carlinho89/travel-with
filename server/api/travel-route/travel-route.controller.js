'use strict';

import _ from 'lodash';
import TravelRoute from './travel-route.model';
import User from '../user/user.model';


var ObjectId = require('mongodb').ObjectID;

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function (entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
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

  return TravelRoute.find({itinerary: {$elemMatch :{$and :[{ startDate : {$lte: req.body.toDate}},{ endDate : {$gte: req.body.startingDate}},{place: req.body.location.name}]}}}).exec()
  //return TravelRoute.find({itinerary: {$elemMatch :  {location:  { $near{type:"Point", coordinates:[11.0,12.0]}} }}}}).exec()
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
  console.log('update!:');
  var travelRequestID = req.body._id;
  console.log('finding by id');

  TravelRoute.findById(travelRequestID).exec(function (err, tr) {
    if (err){
      return handleError(res);
    }
    else {
      console.log('updating');
      tr.remove();
      var updatedTr = new TravelRoute(req.body);
      console.log('updated');
      //console.log(updatedTr);
      updatedTr.save();
      res.send(updatedTr);
    }
  });
}

// Deletes a Thing from the DB
export function destroy(req, res) {
  return TravelRoute.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// Get all TravelRoutes organizef by the user
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

  TravelRoute.findOne({"_id": tr_id})
    .exec(function (err, travelRoute) {
      if (err) {
        console.log('Error');
        return handleError(err);
      }
      else {
        User.find({'_id': { $in : travelRoute.travellers}}).exec(function (err, travellers) {
          if(err){
            console.log('error in user query');
            return handleError(res);
          }
          else {
            res.json(travellers);
          }

        });


      }
    });

}

//Get all travel routes in which the user is registred as traveller
export function getUserAsTravellerTravelRoutes(req, res){
  var user_id = ObjectId(req.params.us_id);

  TravelRoute.find({
    'travellers' : user_id
  }).exec(function (err, travelroutes) {
    if(err){
      console.log('error in query');
      return handleError(res);
    }
    else {
      //console.log(travelroutes);
      res.json(travelroutes);
    }

  });

}

//Get Requestor of a travel route
export function getTravelRoutesRequestor(req, res) {
  var tr_id = ObjectId(req.params.tr_id);
  console.log(tr_id);

  TravelRoute.findOne({"_id": tr_id})
    .exec(function (err, travelRoute) {
      if (err) {
        console.log('Error');
        return handleError(err);
      }
      else {
        User.findOne({'_id': travelRoute.requestor}).exec(function (err, requestor) {
          if(err){
            console.log('error in user query');
            return handleError(res);
          }
          else {
            console.log('Requestor is: ');
            //console.log(requestor);

            res.json(requestor);
          }

        });


      }
    });

}


