var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'UL Timetable' });
});

router.get('/login', function(req, res, next){
  res.render('login', {
    title: 'UL Timetable'
  });
});

module.exports = router;
