'use strict';

var express = require('express');
var controller = require('./travel-route.controller');

var router = express.Router();

router.post('/search', controller.search);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/travelrouth', controller.getUserTravellRouths);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);




module.exports = router;
