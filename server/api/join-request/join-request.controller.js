/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/join-requests              ->  index
 * POST    /api/join-requests              ->  create
 * GET     /api/join-requests/:id          ->  show
 * PUT     /api/join-requests/:id          ->  update
 * DELETE  /api/join-requests/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import JoinRequest from './join-request.model';

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

// Gets a list of JoinRequests
export function index(req, res) {
    return JoinRequest.find().exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single JoinRequest from the DB
export function show(req, res) {
    return JoinRequest.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new JoinRequest in the DB
export function create(req, res) {
    return JoinRequest.create(req.body)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
}

// Updates an existing JoinRequest in the DB
export function update(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    return JoinRequest.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a JoinRequest from the DB
export function destroy(req, res) {
    return JoinRequest.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}

export function getRequest(req, res) {
    console.log("ich bin hier");
    return JoinRequest.find({$and:[{route: req.body.route}, {requestor: req.body.requestor}]}).exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}
