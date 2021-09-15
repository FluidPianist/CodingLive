var express = require('express');
var User = require('../models/user');
var router = express.Router();
router.use(express.json());

var passport=require('passport');
var authenticate=require('../authenticate');
var cors = require('./cors')

/* GET users listing. */
router.options('*',cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})
router.get('/',cors.cors,authenticate.verifyUser,authenticate.verifyAdmin, async (req, res, next) => {
  try{
    const users = await User.find({});
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(users);
  } catch (err) {
    next(err);
  }  
});
router.post('/developer/signup',cors.cors,async (req,res,next)=>{
    try{  
      var user= await User.register(new User({username:req.body.username,email:req.body.email}),req.body.password);
      if(req.body.firstname)
       user.firstname = req.body.firstname;
      if(req.body.lastname)
       user.lastname = req.body.lastname;
      await user.save();
      passport.authenticate('local')(req,res,()=>{ //to ensure the user was registered
        res.statusCode= 200;
        res.setHeader('Content-Type','application/json');
        res.json({success:true,status: 'Registration Succesful',});
      })
    } catch(err){
       next(err);
    }
});

router.post('/developer/login',cors.cors,(req,res,next)=>{ //after authentication is success the verified users property is adedd to the subsequent req messages as req.user
        
  passport.authenticate('local', (err,user,info)=>{
    if(err){
      return next(err);
    }
    if(!user){
      res.statusCode= 401;
      res.setHeader('Content-Type','application/json');
      res.json({success:false,status: 'Login Unsuccessfull',err: info});
    }
    req.logIn(user,(err)=>{
      if(err) {
        res.statusCode= 401;
        res.setHeader('Content-Type','application/json');
        res.json({success:false,status: 'Login Unsuccessfull',err: 'Could not log in user'});
      }
      var token=authenticate.getToken({_id: req.user._id}); //token will be created on success and will be included in the subsequent requests header ( handled by the browser)
      res.statusCode= 200;
      res.setHeader('Content-Type','application/json');
      res.json({success:true,token: token,status: 'You are successfully logged in',}); 
    });

  }) (req,res,next);     
          
});


router.get('/developer/auth/facebook',cors.cors,passport.authenticate("facebook"));

router.get('/developer/facebook/token',passport.authenticate('facebook'), (req, res) => {
  if (req.user) { //added  by deserializeUser()
    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, status: 'You are successfully logged in!'});
  }
});


router.get('/developer/auth/google',cors.cors,passport.authenticate("google",{
  scope: ["profile","email"]
}));

router.get('/developer/google/token', cors.cors,passport.authenticate('google'), (req, res) => {
  if (req.user) { //added  by deserializeUser()
    console.log(req.user);
    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, status: 'You are successfully logged in!'});
  }
});
          




module.exports = router;
