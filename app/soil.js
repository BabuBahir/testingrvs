var Soil = require("../models/soil.js");
module.exports = {
	get: function (req, res){

		Soil.find()
		.exec()
		.then(function (soilType) {
			var soilData = soilType.reduce((acc, cur) => {acc[cur.state] = cur;
				return acc;
			}, {})
			// console.log(soilData)
			res.render('soilType', {
			  error: false,
			  soil: soilData 
			})
		})
		.catch(function (err) {
			return res.json({
			  error: true,
			  reason: err
			});
		})
	},

	post: function (req, res) {
	  var data = req.body;
	  // console.log(data);
	  Soil.findOne({state: data.state})
	  .exec()
	  .then(function (soil) {
	  	// console.log(soil)
	  	if ( soil === null ) {
	  		var soilName = new Soil(data)
	  		return soilName.save()
	  	} else {
	  		// if(soil.state !== undefined){
	  		// 	soil.state =  data.state;
	  		// }
	  		if(data.arid !== undefined){
	  			soil.arid =  data.arid;
	  		}
	  		if(data.black !== undefined){
	  			soil.black =  data.black;
	  		}
	  		if(data.laterite !== undefined){
	  			soil.laterite =  data.laterite;
	  		}
	  		if(data.alluvial !== undefined){
	  			soil.alluvial =  data.alluvial;
	  		}
	  		if(data.redYellow !== undefined){
	  			soil.redYellow =  data.redYellow;
	  		}
	  		if(data.forestMountainous !== undefined){
	  			soil.forestMountainous =  data.forestMountainous;
	  		}
	  		if(data.defaultTpye !== undefined){
	  			soil.defaultTpye =  data.defaultTpye;
	  		}
	  		return soil.save()
	  	}
	  })
	  .then(function (saved) {
	  	return res.json({ error: false, result: 'Added success' });
	  })
	  .catch(function (err) {
	  	// console.log(err)
	  	return res.json({ error: true, reason: err});
	  })
	  
	},


	
}
  