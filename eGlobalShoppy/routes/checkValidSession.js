var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("Valid session - The processer from where am responding " + process.pid);
  var userResobj = {
        isUserLoggedin: req.session.isUserLoggedin,
        accountId: req.session.accountId
  };
  res.send(JSON.stringify(userResobj));
});


module.exports = router;
