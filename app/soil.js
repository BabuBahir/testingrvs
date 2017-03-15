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
	  	if ( soil === null ) {
	  		var soil = new Soil(data)
	  		return soil.save()
	  	} else {
	  		// if(soil.state !== undefined){
	  		// 	soil.state =  data.state;
	  		// }
	  		if(soil.arid !== undefined){
	  			soil.arid =  data.arid;
	  		}
	  		if(soil.black !== undefined){
	  			soil.black =  data.black;
	  		}
	  		if(soil.laterite !== undefined){
	  			soil.laterite =  data.laterite;
	  		}
	  		if(soil.alluvial !== undefined){
	  			soil.alluvial =  data.alluvial;
	  		}
	  		if(soil.redYellow !== undefined){
	  			soil.redYellow =  data.redYellow;
	  		}
	  		if(soil.forestMountainous !== undefined){
	  			soil.forestMountainous =  data.forestMountainous;
	  		}
	  		if(soil.defaultTpye !== undefined){
	  			soil.defaultTpye =  data.defaultTpye;
	  		}
	  		return soil.save()
	  	}
	  })
	  .then(function (saved) {
	  	return res.json({ error: false, result: 'Added success' });
	  })
	  .catch(function (err) {
	  	return res.json({ error: true, reason: err});
	  })
	  
	},


	
}
  