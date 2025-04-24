var express = require('express');
var router = express.Router();
var getMongoDbConnection = require("./common/dbUtil");

/* GET home page. */
router.post('/', function(req, res, next) {
    var resObj = {}

    resObj.msg = 'success';
    console.log("req.body");
    console.log(req.body);
    getMongoDbConnection(req.body, 'addComment', 'productDetails').then((response) => { 
        res.send(JSON.stringify(resObj));
    });
    
});


module.exports = router;
