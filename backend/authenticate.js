var passport = require('passport');
var User = require('./models/user');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var FacebookStrategy=require('passport-facebook').Strategy;
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
        expiresIn: 7200
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
    }));

exports.verifyUser = passport.authenticate('jwt',{session:false});

exports.verifyAdmin = (req,res,next) => {
    console.log("Admin verification");
    if(req.user.admin){
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
    callbackURL: '/users/developer/facebook/token',
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
                if (!err && user !== null) { //Login via a different route
                    err = new Error("You already have an account registered through a different method, Please login using that method");
                    return done(err, false);
                }
                else{
                    user = new User({ username: profile.emails[0].value});
                    user.facebookId = profile.id;
                    user.firstname = profile.name.givenName;
                    user.lastname = profile.name.familyName;
                    user.save((err, user) => {
                        if (err)
                            return done(err, false);
                        else
                            return done(null, user);
                    })
                }
            })
        }
    });
}))

exports.googlePassport = passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/users/developer/google/token"
},(accessToken,refreshToken,profile,done)=>{
    User.findOne({googleId: profile.id}, (err, user) => {
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
                if (!err && user !== null) { //Login via a different route
                    err = new Error("You already have an account , Please login using a different method");
                    return done(err, false);
                }
                else{
                    user = new User({ username: profile.emails[0].value});
                    user.googleId = profile.id;
                    user.firstname = profile.name.givenName;
                    user.lastname = profile.name.familyName;
                    user.save((err, user) => {
                        if (err)
                            return done(err, false);
                        else
                            return done(null, user);
                    })
                }
            })
        }
    });
}))
