const {Router}= require('express');
const {verifyAuth}= require('../passport/verify')
const passport = require('passport')
const router = Router();

router.get('/signup',  (req,res)=>{
  res.render('user/signup',{signup:true})
})

router.get('/signin', (req,res)=>{
  res.render('user/signin',{signin:true})
})

router.post('/signup', passport.authenticate('signup',{
  successRedirect:'/signin',
  failureRedirect:'/signup',
  failureFlash:true
}),(req,res)=>{})

router.post('/signin', passport.authenticate('signin',{
  successRedirect:'/links',
  failureRedirect:'/signup',
  failureFlash:true
}),(req,res)=>{})


router.get('/signin',  (req,res)=>{
  res.render('user/signin',{signin:true})
})

router.get('/signout',  (req,res)=>{
  req.logOut();
  res.redirect('/signin')
})

module.exports=router;