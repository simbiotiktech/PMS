var express = require('express'); // Import express
var app = express(); // Initialize the app
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});



module.exports = router;
