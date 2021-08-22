var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');


/* GET home page. */
router.get('/', function(req, res, next) {
  return res.render('parking.ejs')

});

module.exports = router;
