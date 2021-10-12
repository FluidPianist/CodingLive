var passport = require('passport');
var User = require('./models/user');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var FacebookStrategy=require('passport-facebook').Strategy;
//var FacebookTokenStrategy = require('passport-facebook-token');
var GoogleStrategy= require('passport-google-oauth20').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');

//User.authenticate,User.serializeUser,User.deserializeUser are prebuilt methods present in passportLocalMongoose which was plugged inside the userschema

exports.local=passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); //decides what all should be added to req.session
passport.deserializeUser(User.deserializeUser()); //adds user to req.user

//These two functions are called everytime an authenticate strategy is invoked

exports.getToken = function(user){
    return jwt.sign(user,process.env.SECRET_KEY,{
        expiresIn: 3600
    });
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); //extracting token from request header
opts.secretOrKey = process.env.SECRET_KEY;

exports.jwtPassport= passport.use(new JwtStrategy(opts, 
    (jwt_payload,done)=>{ //this the verify function strategy which is used to verify the tokens
        console.log("JWT payload ",jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err,user)=>{
            if(err) {  //connection error
                return done(err,false);
            }
            else if (user) {
                return done(null,user); //auth success
            }
            else{
                return done(null,false); //no user found 
            }
        });
    })
);

exports.verifyUser = passport.authenticate('jwt',{session:false});

exports.verifyAdmin = (req,res,next) => {
    console.log("Admin verification");
    if(req.user.usertype==="admin"){
        next();
    }
    else{
        err = new Error("Admin access required!!")
        err.status = 403;
        return next(err);
    }
}


exports.facebookPassport = passport.use(new FacebookStrategy({
    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET,
    callbackURL: '/user/facebook/token',
    profileFields: ["email", "name",]
},(accessToken,refreshToken,profile,done)=>{
    User.findOne({facebookId: profile.id}, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (!err && user !== null) {
            return done(null, user);
        }
        else { //if no such user present then create account
            User.findOne({username: profile.emails[0].value}, (err, user)=>{
                if (err) {
                    return done(err, false);
                }
                if(!err&&user.usertype!=="candidate"){  //No OAuth for admin and company
                    var errmsg = "Google or Facebook Connect Only for candidate";
                    return done(null,false,errmsg);
                }
                if (!err && user !== null) { //Link Account if already exists for candidate
                    user.facebookId=profile.id;
                }
                else{
                    user = new User({ username: profile.emails[0].value});
                    user.facebookId = profile.id;
                    user.usertype="candidate";                    
                }
                user.save((err, user) => {
                    if (err)
                        return done(err, false);
                    else
                        return done(null, user);
                });
            })
        }
    });
}))

exports.googlePassport = passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/user/google/token"
},(accessToken,refreshToken,profile,done)=>{
    User.findOne({googleId: profile.id}, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (!err && user !== null) {
            return done(null, user);
        }
        else { //If no such user present then create account if account does not exist using a different method
            
            User.findOne({username: profile.emails[0].value}, (err, user)=>{
                if (err) {
                    return done(err, false);
                }
                if(!err&&user.usertype!=="candidate"){
                    var errmsg = "Google or Facebook Connect Only for candidate";
                    return done(null,false,errmsg);
                }
                if (!err && user !== null) { //Login via a different route
                    user.googleId=profile.id;
                }
                else{
                    user = new User({ username: profile.emails[0].value});
                    user.googleId = profile.id;
                    user.usertype="candidate";                    
                }
                user.save((err, user) => {
                    if (err)
                        return done(err, false);
                    else
                        return done(null, user);
                });
            })
        }
    });
}))

