
'use strict';

var express = require('express');
var controller = require('./message.controller');

var router = express.Router();
router.post('/add', controller.create);
router.get('/', controller.index);


module.exports = router;
