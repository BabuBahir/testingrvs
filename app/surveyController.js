var Survey = require('../models/survey');

module.exports = {
        SaveExpert: function(req, res) { 
             var Sid = req.body.Sid;
             var expComment = req.body.expComment;
             
             Survey.find({_id : Sid})
    			.exec(function(err, doc){  
    			if(err){
    				console.log(err);
				 return res.json({error : true, reason : err});
				}

          		else{ 
          			Survey.update({_id: Sid}, {$set: { status: 'Review Completed' , ExpertComment : expComment }} , function(err , result){          					 
          					res.send(result);
      				});
          		};
        });
    }
}