

const verifyAuth = (req,res,next)=>{
    if(!req.isAuthenticated()){
       return res.redirect('/signin')
    }

    next();
}

module.exports ={
  verifyAuth
}