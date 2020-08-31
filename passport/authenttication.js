const {Strategy} = require('passport-local')
const passport = require('passport')
const {encryptPassword, comparePassword} = require('./bcrypt')
const {connect}= require('../database')


passport.use('signup', new Strategy({
   usernameField:'username',
   passwordField:'password',
   passReqToCallback:true

},async (req,username, password, done)=>{
    const {fullname}= req.body;
    const pool = await connect();
       
     const newUser={
      username,
      password,
      fullname
    }

    newUser.password  = await  encryptPassword(password)
    const user = await pool.query('INSERT INTO users SET ? ',[newUser])
    newUser.id = user[0].insertId
    return done(null, newUser)
    
   
}))


passport.use('signin', new Strategy({
  usernameField:'username',
  passwordField:'password',
  passReqToCallback:true
}, async (req,username,password, done)=>{
     const pool = await connect();
     const user = await pool.query('SELECT * FROM users where username=?',[username])
     console.log(user[0][0])
    if(!user[0][0]){
       return done(null, false, req.flash('error','user no existe' ))
    }
    
   const verifyUser = await comparePassword(password, user[0][0].password)
    if(!verifyUser){
      return done(null, false, req.flash('error','password incorrecto' ))
    }else{
      return done (null, user[0][0])
    }
    
}))

passport.serializeUser((user,done)=>{
    done(null,user.id)

})

passport.deserializeUser(async(id,done)=>{
  const pool = await connect();
  const row = await pool.query('SELECT * FROM users WHERE id=?',id)
  const user= row[0][0]
  done(null, user)
})