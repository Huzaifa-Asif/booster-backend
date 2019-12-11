var express = require('express')
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
const mongoose = require('mongoose')
var port =  5000

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Set up mongoose connection
let dev_db_url = 'mongodb+srv://booster:tech8580@booster-on6f9.mongodb.net/booster?retryWrites=true';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true }).then(() => console.log('MongoDB connected…'))
.catch(err => console.log(err));



// routes call
app.get('/', (req, res) => {
  res.json({
    message: "Welcome to Booster Backend"
})
});

var Users = require('./routes/Users')
var ordRouter = require('./routes/Orders');
var contentcreatorsRouter = require('./routes/ContentCreators');

app.use('/users', Users)
app.use('/orders',ordRouter)
app.use('/contentcreators',contentcreatorsRouter)

app.listen(process.env.PORT || port, function() {
  console.log('Server is running on port: ' + port)
})

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
