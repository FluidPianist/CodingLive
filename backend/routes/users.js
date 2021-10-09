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

router.post('/signup/candidate',cors.cors,async (req,res,next)=>{
    try{ 
      var user= await User.register(new User({username:req.body.username}),req.body.password);
       user.usertype = "candidate";
       await user.save();
      passport.authenticate('local')(req,res,()=>{ //to ensure the user was registered
        res.statusCode= 200;
        res.setHeader('Content-Type','application/json');
        res.json({success:true,status: 'Registration Succesful',});
      })
    } catch(err){
       next(err);
    }
}); //frontend calls the login api once the signup api is successfull for candidate

router.post('/signup/company',cors.cors,async (req,res,next)=>{
      res.statusCode= 200;
      res.setHeader('Content-Type','application/json');
      res.json(req.body);  
}); //Redirects to the Welcome page with approval waiting message 

router.post('/signup/searchemail',cors.cors,async (req,res,next)=>{
  try{  
    var user= await User.findOne({username: req.body.username});
    var available = (user===null)?true:false;
      res.statusCode= 200;
      res.setHeader('Content-Type','application/json');
      res.json({available});    
  } catch(err){
     next(err);
  }
});

router.post('/login',cors.cors,(req,res,next)=>{ //after authentication is success the verified users property is adedd to the subsequent req messages as req.user
        
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
        res.json({success:false,status: 'Login Unsuccessfull',err: 'Incorrect Password'});
      }
      var token=authenticate.getToken({_id: req.user._id}); //token will be created on success and will be included in the subsequent requests header ( handled by the browser)
      res.statusCode= 200;
      res.setHeader('Content-Type','application/json');
      res.json({success:true,token: token,status: 'You are successfully logged in',usertype:req.user.usertype}); 
    });

  }) (req,res,next);     
          
});

//No facebook or Google for company

router.get('/auth/facebook',cors.cors,passport.authenticate("facebook"));

router.get('/facebook/token',passport.authenticate('facebook'), (req, res) => {
  if (req.user) { //added  by deserializeUser()
    var token = authenticate.getToken({_id: req.user._id});
    //res.json({success: true, token: token, status: 'You are successfully logged in!', usertype:req.user.usertype});
    res.redirect("http://localhost:3000/?token="+token+"&username="+req.user.username+"&garbage=");
  }
});


router.get('/auth/google',cors.cors,passport.authenticate("google",{
  scope: ["profile","email"]
}));

router.get('/google/token', cors.cors,passport.authenticate('google'), (req, res) => {
  if (req.user) { //added  by deserializeUser()
    var token = authenticate.getToken({_id: req.user._id});
    //res.json({success: true, token: token, status: 'You are successfully logged in!', usertype:req.user.usertype});
    res.redirect("http://localhost:3000/?token="+token+"&username="+req.user.username+"&garbage=");
  }
});
          
//If the user has signed up for the first time They will be prompted to enter their basic personal details.
//From the profile section of google and facebook some info in the post-signup form 
//For local login method the post-signup form will remain empty. 


module.exports = router;
