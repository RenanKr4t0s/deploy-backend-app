var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.send('<h2>Hello World!!</h2>');
});

module.exports = router;
