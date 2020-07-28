var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/website', { useNewUrlParser: true });


var indexRouter = require('./routes/index');
var activityRouter = require('./routes/activityApi');
var authRouter = require('./routes/authApi');
var carouselRouter = require('./routes/carouselApi');
var contactRouter = require('./routes/contactApi');
var environmentRouter = require('./routes/environmentApi');
var gainRouter = require('./routes/gainApi');
var ownerRouter = require('./routes/ownerApi');
var businessRouter = require('./routes/businessApi');
var skillRouter = require('./routes/skillApi');
var teamRouter = require('./routes/teamApi');
var usersRouter = require('./routes/userApi');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(session({
  secret: 'session-secret',
  cookie: { maxAge: 600 * 1000 }
}));
  
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/auth', authRouter);
app.use('/carousel', carouselRouter);
app.use('/gain', gainRouter);
app.use('/team', teamRouter);
app.use('/activity', activityRouter);
app.use('/contact', contactRouter);
app.use('/owner', ownerRouter);
app.use('/business', businessRouter);
app.use('/environment', environmentRouter);
app.use('/skill', skillRouter);

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
