var express = require('express');
var router = express.Router();

var sendMail = require("./common/mailUtil");

/* GET home page. */
router.get('/', function(req, res, next) {
    var mailcontent = req.query.otpValue;
    sendMail("webdev.prasad@gmail.com", "Login OTP", mailcontent);
    res.send("mAIL BEEN SENT");
});


module.exports = router;
