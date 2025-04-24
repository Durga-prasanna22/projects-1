var express = require('express');
var router = express.Router();
var getMongoDbConnection = require("./common/dbUtil");

/* GET home page. */
router.post('/', function(req, res, next) {
    var userData = req.body;
    getMongoDbConnection(userData, 'addNewProduct', 'productDetails').then((response) => { 
        res.send(JSON.stringify({msg: 'success'}));
    });
});


module.exports = router;
