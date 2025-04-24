var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
    var data = {name: "raj", age: 23};
    // res.send("Hello i got created fr = response from webservice");
    res.send(JSON.stringify(data));
});

module.exports = router;
