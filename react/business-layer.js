


var  express= require("express");   //installed Express
var mongoClient = require("mongodb").MongoClient; //installed mongodb
var cors = require("cors"); //installed cors

var conString = "mongodb://127.0.0.1:27017";  //connected to mongodb

var app = express(); //created app using express
app.use(cors()); //app using cors(cors will operate CRUD operations)
app.use(express.urlencoded({extended:true})); //converting the data from server to client(Only for all CRUD methods(GET, POST, PUT, DELETE))
app.use(express.json()); //into JSON

//Register-User(Sending data into Mongodb)
app.post("/register-user", (req, res) => {
    var user = {
        UserId: req.body.UserId,
        UserName: req.body.UserName,
        Password: req.body.Password,
        Email: req.body.Email,
        Mobile: req.body.Mobile
    }
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("todo");
        database.collection("users").insertOne(user).then(() => {
            console.log("User Registered");
            res.end();
        })
    })
})

//Login-user(Retrieving data from mongodb)
app.get("/users",(req,res) => {
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("todo");
        database.collection("users").find({}).toArray().then(documents => {
            res.send(documents);
            res.end();
        })
    })
})

//Add appointment
app.post("/add-appointment", (req, res) => {
    var appointment = {
        AppointmentId: parseInt(req.body.AppointmentId),
        Title:req.body.Title,
        Description:req.body.Description,
        Date: new Date(req.body.Date),
        UserId:req.body.UserId
    }
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("todo");
            database.collection("appointments").insertOne(appointment).then(() => {
                console.log("appointment Added...");
                res.end();
            })
    })
})

//Get the data from mongodb by userId
app.get("/get-appointments/:userid", (req, res) => {
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("todo");
        database.collection("appointments").find({UserId:req.params.userid}).toArray().then(documents => {
            res.send(documents);
            res.end();
        })
    })
});

//Get the data from mongodb by Id
app.get("/get-appointment/:id", (req, res) => {
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("todo");
        database.collection("appointments").find({AppointmentId:parseInt(req.params.id)}).toArray().then(documents => {
            res.send(documents);
            res.end();
        })
    })
});

// Get the appointment details and Modify the details using Id
app.put("/edit-appointment/:id", (req,res) => {
    var id = parseInt(req.params.id);
    var appointment = {
        AppointmentId: parseInt(req.body.AppointmentId),
        Title:req.body.Title,
        Description:req.body.Description,
        Date: new Date(req.body.Date),
        UserId:req.body.UserId
    }
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("todo");
        database.collection("appointments").updateOne({AppointmentId:id}, {$set:appointment});
            console.log("appointment Updated...");
            res.end();
        
    })
});

//Delete appointment using Id
app.delete("/delete-appointment/:id", (req, res) => {
    var id = parseInt(req.params.id);

    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("todo");
        database.collection("appointments").deleteOne({AppointmentId:id}).then(() => {
            console.log("Appointment Deleted...")
            res.end();
        })
    })
});




app.listen(4500);
console.log(`Server Started http://127.0.0.1:4500`);