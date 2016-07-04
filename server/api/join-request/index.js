'use strict';

var express = require('express');
var controller = require('./join-request.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/searchByRoute', controller.getRequestsForRoute);
router.post('/searchByUser', controller.getRequestsByUser);
router.post('/searchForUser', controller.getRequestsForUser);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
