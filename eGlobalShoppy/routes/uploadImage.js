var express = require('express');
var router = express.Router();
const multer  = require('multer');
const path = require("path");
var file_path;
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, 'public/images/uploaded_porduct_images');
    },
    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, callback) { 
        file_path = "userImage_" + Date.now() + path.extname(file.originalname);
        callback(null, file_path);
    }
});
var upload = multer({storage: storage}).single('prodImage');
/* GET home page. */
router.post('/', function(req, res, next) {
    var data = {};
    upload(req, res, function(err) {
        if (err) {
            data.msg = "ERROR"
            console.log(err);
        } else {
            data.file_path = '/images/uploaded_porduct_images/' + file_path;
            data.msg = 'success';
        }
        res.send(JSON.stringify(data));
    });
});


module.exports = router;
