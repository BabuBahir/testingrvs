var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var adminSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    password: String,
    profilePicUrl: String
});

adminSchema.pre('save', function(next) {	
    var admin = this;
    if (this.isModified('password') || this.isNew) {
        	bcrypt.genSalt(10, function(err, salt) {
	            if (err) {	            	
	                return next(err);
            	}
		        bcrypt.hash(admin.password, salt, function(err, hash) {		        	
		                if (err) {
		                    return next(err);
		                }
		                admin.password = hash;                              
		                next();
            });
        });
    } else {    	
        return next();
    }
});

adminSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('admin', adminSchema);
