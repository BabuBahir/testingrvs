var admin = require("../models/admin.js");
var bcrypt = require('bcrypt');

module.exports = {
  index: function (req, res) {
  	admin.findOne({name:"Admin 001"}, function(err, data){  		
  		var salt = bcrypt.genSaltSync(10);// Hash the password with the salt
		var hash = bcrypt.hashSync("papa", salt);		
		console.log(data.email);
		data.comparePassword(req.body.password, function (err, isMatch) {
		if (isMatch && !err) {
			//store whatever you need to store in the locals or session
			sess = req.session;
			sess.user = req.body.email;			        
			res.redirect('/survey');
		  }
		else{ console.log('false');res.send('Wrong password'); }
		});		
  	});           
  	
  }

}  