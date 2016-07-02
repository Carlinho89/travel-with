'use strict';

var express = require('express');
var controller = require('./travel-route.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/usr_trips/:us_id', controller.getUserTravelRoutes);
router.get('/travellers/:tr_id', controller.getTravelRoutesTravellers);
router.get('/astraveller/:us_id', controller.getUserAsTravellerTravelRoutes);


router.post('/', controller.create);
router.post('/search', controller.search);

router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);




module.exports = router;
