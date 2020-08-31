
const express = require('express');
const morgan  = require('morgan');
const path    = require('path');
const hbs = require('express-handlebars')
const session = require('express-session')
const flash = require('connect-flash')
const error = require('errorhandler')
const methodOverride = require('method-override')
const passport = require('passport')
//intialization
const app = express();

require('./passport/authenttication')

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'))
app.engine('.hbs', hbs({
  defaultLayout:'main',
  layoutsDir:path.join(app.get('views'),'layout'),
  partialsDir:path.join(app.get('views'),'partial'),
  extname:'.hbs',
  helpers:require('./helpers/handlebars')
}))

app.set('view engine', '.hbs')

//middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(session({
  secret: 'true',
  resave: false,
  saveUninitialized: true,
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.use((req,res,next)=>{
 app.locals.message= req.flash('message');
 app.locals.error= req.flash('error');
 app.locals.user=req.user || null
  next();
})

app.use(require('./router/index.router'))
app.use(require('./router/auth'))
app.use('/links',require('./router/links'))

app.use(express.static(path.join(__dirname,'public')))

app.get('**',(req,res)=>{
  res.json({
    message:"error 4040 page not found"
  })
})

process.env.NODE_ENV !=='production' ? app.use(error()):''
module.exports= app;












