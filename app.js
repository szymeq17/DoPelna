const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
var SequelizeStore = require("connect-session-sequelize")(session.Store);
const csrf = require('csurf');
const flash = require('connect-flash');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const pricesRouter = require('./routes/prices');
const stationsRouter = require('./routes/stations');

const User = require('./models/user');
const Station = require('./models/station');
const Price = require('./models/price');
const errorController = require('./controllers/error');


const sequelize = require('./utils/database');
// const { Sequelize } = require('sequelize/types');
User.hasMany(Price);
Price.belongsTo(User);
Station.hasMany(Price);
Price.belongsTo(Station);

const csrfProtection = csrf();

const app = express();

app.use(session({
  secret: "secret",
  store: new SequelizeStore({
    db: sequelize
  }),
  resave: false,
  saveUninitialized: false
}));

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

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if(req.session.user) {
    User.findOne({where: {id: req.session.user.id}})
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => {
      console.log(err);
    });
  }
  else {
    next();
  }
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
})

app.use('/', indexRouter);
app.use(stationsRouter)
app.use(pricesRouter)
app.use('/user', usersRouter);

app.use(errorController.get404);



