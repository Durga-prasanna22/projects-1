var express = require('express');
var router = express.Router();
var bcrypt = require("bcrypt");
var getDatabaseConnection = require("./common/dbUtil");
/* GET home page. */
router.post('/', function(req, res, next) {
    var userData = req.body;
    bcrypt.hash(userData.password, 5, (error, encryptedPwd) =>{
        userData.password = encryptedPwd;
        getDatabaseConnection(userData, 'insert', 'userAccountDetails').then((response) => {
            var resObj = {};
            resObj.msg = 'Success';
            res.send(JSON.stringify(resObj));
        })
    });
    
});


module.exports = router;
