var express = require('express');
var router = express.Router();
var mainCtrl = require('../app_server/controllers/main')


/* GET home page. */
router.get('/', mainCtrl.index);




module.exports = router;
