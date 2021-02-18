const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const pricesRouter = require('./routes/prices');
const stationsRouter = require('./routes/stations');

const User = require('./models/user');
const Station = require('./models/station');
const Price = require('./models/price');
const errorController = require('./controllers/error');


const sequelize = require('./utils/database');
User.hasMany(Price);
Station.hasMany(Price);



const app = express();

sequelize.sync()
  .then(result => {
    app.listen(3000); 
    console.log(result);

  })
  .catch(err => {
    console.log(err);
  });

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use(stationsRouter)
app.use(pricesRouter)
app.use('/user', usersRouter);

app.use(errorController.get404);



