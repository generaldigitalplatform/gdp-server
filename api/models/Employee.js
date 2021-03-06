var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
 
var EmployeeSchema = new mongoose.Schema({
 
    employeeid: {
        type: String,
        required: true
    },
    employerid: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String
    },
    primaryphone: {
        type: Number,
        required: true
    },
    secondaryphone: {
        type: Number
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['employee'],
        default: 'employee'
    },    
    resetPasswordToken:String,
    resetPasswordExpires:Date
 
},{strict:false}, {
    timestamps: true
});
 
EmployeeSchema.pre('save', function(next){
 
    var user = this;
    var SALT_FACTOR = 5;
 
    if(!user.isModified('password')){
        return next();
    } 
 
    bcrypt.genSalt(SALT_FACTOR, function(err, salt){
 
        if(err){
            return next(err);
        }
 
        bcrypt.hash(user.password, salt, null, function(err, hash){
 
            if(err){
                return next(err);
            }
 
            user.password = hash;
            next();
 
        });
 
    });
 
});
 
EmployeeSchema.methods.comparePassword = function(passwordAttempt, cb){
 
    bcrypt.compare(passwordAttempt, this.password, function(err, isMatch){
 
        if(err){
            return cb(err);
        } else {
            cb(null, isMatch);
        }
    });
 
}

// UserSchema.methods.hashPassword = function(password) {
//     if (this.salt && password) {
//         return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
//     } else {
//         return password;
//     }
// };

module.exports = mongoose.model('Employee', EmployeeSchema);