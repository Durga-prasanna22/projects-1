var router = require("express").Router();
var bcrypt = require("bcrypt");
var getMongoDbConnection = require("./common/dbUtil");
const session = require("express-session");
var jwt = require("jsonwebtoken");

router.post("/", (req, res, next) => {
    
    var userData = req.body;
    var resObj = {};
    req.session.isUserLoggedin = false;
    getMongoDbConnection(userData, 'find', 'userAccountDetails').then((response) => {
        if (response.length) {
            bcrypt.compare(userData.password, response[0].password, function(err, result) {
                if (result) {
                    resObj.msg = 'Valid';                    
                    req.session.isUserLoggedin = true;
                    req.session.accountId = userData.accountId;
                    var JWT_token = jwt.sign({ data: userData.accountId, expiresIn: '10s' }, process.env.JWT_SECRET_KEY);
                    resObj.token = JWT_token;
                } else {
                    resObj.msg = 'Invalid';
                }
                res.send(JSON.stringify(resObj));
            });            
        } else {
            resObj.msg = 'Invalid';
            res.send(JSON.stringify(resObj));
        }        
    })
});
module.exports = router;