var express = require('express');
var router = express.Router();
var getMongoDbConnection = require("./common/dbUtil");
const session = require('express-session');
var jwt = require("jsonwebtoken");


/* GET home page. */
router.get('/', function(req, res, next) {
    var resObj = {};
    var userPassedJwtToken = req.headers['authorization'] ? req.headers['authorization'] : '';
    userPassedJwtToken = userPassedJwtToken.replace('Bearer ', '');
    jwt.verify(userPassedJwtToken, process.env.JWT_SECRET_KEY, (err, data) => {
        if (err) {
            resObj.msg = 'Unauthorized user';
            res.send(JSON.stringify(resObj));
        } else {
            getMongoDbConnection(req.query, 'findProductDetails', 'productDetails').then((response) => {
                resObj.productDetails = response;
                res.send(JSON.stringify(resObj));
            }).catch((error) => {
        
            });
        }
    })    
});


module.exports = router;
