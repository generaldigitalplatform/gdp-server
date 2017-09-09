var passport = require('passport');
var Employer = require('../../models/Employer');
var config = require('../auth');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var LocalStrategy = require('passport-local').Strategy;
 
var localOptions = {
    usernameField: 'email'
};
 
var localEmploerLogin = new LocalStrategy(localOptions, function(email, password, done){
 
    Employer.findOne({
        email: email
    }, function(err, user){
 
        if(err){
            return done(err);
        }
 
        if(!user){
            return done(null, false, {error: 'Login failed. Please try again with right EmailID'});
        }
 
        user.comparePassword(password, function(err, isMatch){
 
            if(err){
                return done(err);
            } 
            if(!isMatch){
                return done(null, false, {error: 'Login failed. Please try again with right Password'});
            } 
            return done(null, user);
 
        });
 
    });
 
});
 
var jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: config.secret
};
 
var jwtEmployerLogin = new JwtStrategy(jwtOptions, function(payload, done){
 
    Employer.findById(payload._id, function(err, user){
 
        if(err){
            return done(err, false);
        }
 
        if(user){
            done(null, user);
        } else {
            done(null, false);
        }
 
    });
 
});
 
passport.use(jwtEmployerLogin);
passport.use(localEmploerLogin);