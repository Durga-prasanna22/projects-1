var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var empDetailsRouter = require("./routes/getEmployeeDetails");
var validationRouter = require("./routes/validateUserCredentials");
var newUserSignupRouter = require("./routes/newUserSignup");
var productDetailsRouter = require("./routes/getProductDetails");
var userCommentsRouter = require("./routes/addUserComments");
var checkUserSession = require("./routes/checkValidSession");
var termiateSession = require("./routes/sessionTerminate");
var inserNewProduct = require("./routes/addNewProduct");
var uploadImageRouter = require("./routes/uploadImage");
var mailRouter = require("./routes/sendMail");
const dotenv = require('dotenv').config();
const numberOfCPUs = require('os').availableParallelism();


const cluster = require('cluster');
var http = require("http");
var server;
var app = express();
var usersConnected = 0;

if (cluster.isPrimary) {
  for (var i = 0 ; i < numberOfCPUs; i++) {
    cluster.fork();
  }
} else {
  server = http.createServer(app);
  server.listen(process.env.SERVER_PORT, () => {
    console.log(`server is listing at ${process.env.SERVER_PORT} and process id is ${process.pid} `);
  });
}
const { Server } = require("socket.io");
const io = new Server(server);



// var jwt = require('jsonwebtoken');
// var token = jwt.sign({ foo: 'test' }, '1234');

io.on('connection', (socket) => {
  usersConnected++;
  console.log('a user connected , current count ' + usersConnected);
  socket.on("disconnect", () => {
    usersConnected--;
    console.log('a user got disconnected , current count ' + usersConnected);
  });

  socket.on("userSendMsg", (data) => {
    console.log("Received msg from one client");
    console.log(data);
    socket.broadcast.emit("receiveMsg", data);
  });
});

app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  // resave: false,
  // saveUninitialized: true,
  cookie: { maxAge: 60000}
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/get/employeedetails", empDetailsRouter);
app.use("/validate/credentials", validationRouter);
app.use("/get/productDetails", productDetailsRouter)
app.use("/new/userSignup", newUserSignupRouter);
app.use("/add/userComment", userCommentsRouter);
app.use("/session/checkUserSession", checkUserSession);
app.use("/terminate/session", termiateSession);
app.use("/add/newProduct", inserNewProduct);
app.use("/upload/image", uploadImageRouter);
app.use("/send/mail", mailRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
