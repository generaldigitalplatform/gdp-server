var passport = require('passport');
var User = require('../models/User');
var Employer = require('../models/Employer');
var config = require('./auth');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var LocalStrategy = require('passport-local').Strategy;
 
var localOptions = {
    usernameField: 'email'
};


 passport.use('local-employee', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password' // this is the virtual field on the model
    },
    function(email, password, done) {
      User.findOne({
        email: email
      }, function(err, user) {
        if (err) return done(err);

        if (!user) {
          return done(null, false, {
            message: 'This email is not registered.'
          });
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
    }
  ));

  passport.use('local-employer', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password' // this is the virtual field on the model
    },
    function(email, password, done) {
      Employer.findOne({
        email: email
      }, function(err, user) {
        if (err) return done(err);

        if (!user) {
          return done(null, false, {
            message: 'This email is not registered.'
          });
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
    }
  ));

 
    var locallogin = new LocalStrategy(localOptions, function(email, password, done){ 
    User.findOne({
        email: email
    }, function(err, user){
 
        if(err){
            return done(err);
        }
 
        if(!user){
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

            //return done(null, false, {error: 'Login failed. Please try again with right EmailID'});
        }
 
        else{user.comparePassword(password, function(err, isMatch){
 
            if(err){
                return done(err);
            } 
            if(!isMatch){
                return done(null, false, {error: 'Login failed. Please try again with right Password'});
            } 
            return done(null, user);
 
        });
    };
 
    });
 
});

//  var localloginemployer = new LocalStrategy(localOptions, function(email, password, done){ 
//     Employer.findOne({
//         email: email
//     }, function(err, user){
 
//         if(err){
//             return done(err);
//         }
 
//         if(!user){
//             return done(null, false, {error: 'Login failed. Please try again with right EmailID'});
//         }
 
//         user.comparePassword(password, function(err, isMatch){
 
//             if(err){
//                 return done(err);
//             } 
//             if(!isMatch){
//                 return done(null, false, {error: 'Login failed. Please try again with right Password'});
//             } 
//             return done(null, user);
 
//         });
 
//     });
 
// });


var jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: config.secret
};
 
passport.use('jwt', new JwtStrategy(jwtOptions, function(payload, done){
    User.findById(payload._id, function(err, user){
 
        if(err){
            return done(err, false);
        }
 
        if(user){
            done(null, user);
        } else {
            done(null, false);
        }
 
    });
 
}));

passport.use('jwt-employer', new JwtStrategy(jwtOptions, function(payload, done){
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
 
}));

var jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: config.secret
};
 
var jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
 
    User.findById(payload._id, function(err, user){
 
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
 
passport.use(jwtLogin);
  // passport.use(locallogin);
  // passport.use(jwtloginemployer);
  // passport.use(localloginemployer);