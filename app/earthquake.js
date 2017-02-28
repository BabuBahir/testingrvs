var Earthquake = require("../models/earthquake.js");
module.exports = {
  
  
  addInfo: function (req, res) {
  		var info = req.body.info;
	Earthquake.create(info, function(err, docs) {  //pass the array to the callback function
    if (err) throw err;
    console.log(docs);
	});
  },

  updateInfo: function (req, res){
  	var info = req.body.info;
  	Earthquake
		.remove({})
		 .exec()
		  .then(function(tasks){
				return res.json(tasks);
		  })
	    .catch(function(err){
		   return res.json({
           error: true,
           message: 'Failed to delete',
           reason: err
           });
		});
  			Earthquake.create(info, function (err, data) {
  				console.log(data)
   			 if (err) return res.send(err);
    			res.send(data);
 	    	});
  },
/*
  viewInfo: function (req, res) {
    	Earthquake.aggregate(
        [
        { "$group": { 
            "_id": '$state',                          
            stateinfo: { $push:  { zone:"$zone", zoneinfo: "$zoneinfo" } }
        }},
        { "$sort": { "_id": 1 } }
      ],
    function(err,doc) {
      if(err){
    			console.log(err);
				 return res.json({error : true, reason : err});
    		}

           else{
				console.log(doc);
				  return res.render('earthquakeInfo', {result: doc});
			}
    }
);
  }*/
  viewInfo: function (req, res){
  	Earthquake.find({})
    	.exec(function(err, doc){  
    		if(err){
    			console.log(err);
				 return res.json({error : true, reason : err});
    		}

           else{
				var BiharObj = [];
       			 doc.forEach(function(o){if (o.state == 'Bihar') BiharObj.push(o);} );
       			 var simpleBihar = {state :"Bihar"};
       			 BiharObj.forEach(function(o,index){  
       			 	    simpleBihar[o.zone] = o.zoneinfo 
       			 	});
       			 var Obj1 = [];
       			 doc.forEach(function(o){if (o.state == 'Gujarat') Obj1.push(o);} );
       			 var simple1 = {state :"Gujarat"};
       			 Obj1.forEach(function(o,index){ //  console.log(o);
       			 	    simple1[o.zone] = o.zoneinfo 
       			 	});
       			 var Obj2 = [];
       			 doc.forEach(function(o){if (o.state == 'AndamanandNicobarIslands') Obj2.push(o);} );
       			 var simple2 = {state :"AndamanandNicobarIslands"};
       			 Obj2.forEach(function(o,index){ //  console.log(o);
       			 	    simple2[o.zone] = o.zoneinfo 
       			 	});
       			 var Obj3 = [];
       			 doc.forEach(function(o){if (o.state == 'AndhraPradesh') Obj3.push(o);} );
       			 var simple3 = {state :"AndhraPradesh"};
       			 Obj3.forEach(function(o,index){ //  console.log(o);
       			 	    simple3[o.zone] = o.zoneinfo 
       			 	});
       			 var Obj4 = [];
       			 doc.forEach(function(o){if (o.state == 'ArunachalPradesh') Obj4.push(o);} );
       			 var simple4 = {state :"ArunachalPradesh"};
       			 Obj4.forEach(function(o,index){ //  console.log(o);
       			 	    simple4[o.zone] = o.zoneinfo 
       			 	});
       			 var Obj5 = [];
       			 doc.forEach(function(o){if (o.state == 'Assam') Obj5.push(o);} );
       			 var simple5 = {state :"Assam"};
       			 Obj5.forEach(function(o,index){ //  console.log(o);
       			 	    simple5[o.zone] = o.zoneinfo 
       			 	});
                 var Obj6 = [];
       			 doc.forEach(function(o){if (o.state == 'Chandigarh') Obj6.push(o);} );
       			 var simple6 = {state :"Chandigarh"};
       			 Obj6.forEach(function(o,index){ //  console.log(o);
       			 	    simple6[o.zone] = o.zoneinfo 
       			 	});
       			  var Obj7 = [];
       			 doc.forEach(function(o){if (o.state == 'Chhattisgarh') Obj7.push(o);} );
       			 var simple7 = {state :"Chhattisgarh"};
       			 Obj7.forEach(function(o,index){ //  console.log(o);
       			 	    simple7[o.zone] = o.zoneinfo 
       			 	});
       			 var Obj8 = [];
       			 doc.forEach(function(o){if (o.state == 'DadraandNagarHaveli') Obj8.push(o);} );
       			 var simple8 = {state :"DadraandNagarHaveli"};
       			 Obj8.forEach(function(o,index){ //  console.log(o);
       			 	    simple8[o.zone] = o.zoneinfo 
       			 	});var Obj9 = [];
       			 doc.forEach(function(o){if (o.state == 'DamanandDiu') Obj9.push(o);} );
       			 var simple9 = {state :"DamanandDiu"};
       			 Obj9.forEach(function(o,index){ //  console.log(o);
       			 	    simple9[o.zone] = o.zoneinfo 
       			 	});var Obj10 = [];
       			 doc.forEach(function(o){if (o.state == 'Delhi') Obj10.push(o);} );
       			 var simple10 = {state :"Delhi"};
       			 Obj10.forEach(function(o,index){ //  console.log(o);
       			 	    simple10[o.zone] = o.zoneinfo 
       			 	});var Obj11 = [];
       			 doc.forEach(function(o){if (o.state == 'Goa') Obj11.push(o);} );
       			 var simple11 = {state :"Goa"};
       			 Obj11.forEach(function(o,index){ //  console.log(o);
       			 	    simple11[o.zone] = o.zoneinfo 
       			 	});var Obj12 = [];
       			 doc.forEach(function(o){if (o.state == 'Haryana') Obj12.push(o);} );
       			 var b7 = {state :"Haryana"};
       			 Obj12.forEach(function(o,index){ //  console.log(o);
       			 	    b7[o.zone] = o.zoneinfo 
       			 	});var Obj13 = [];
       			 doc.forEach(function(o){if (o.state == 'HimachalPradesh') Obj13.push(o);} );
       			 var b8 = {state :"HimachalPradesh"};
       			 Obj13.forEach(function(o,index){ //  console.log(o);
       			 	    b8[o.zone] = o.zoneinfo 
       			 	});var Obj14 = [];
       			 doc.forEach(function(o){if (o.state == 'JammuandKashmir') Obj14.push(o);} );
       			 var b9 = {state :"JammuandKashmir"};
       			 Obj14.forEach(function(o,index){ //  console.log(o);
       			 	    b9[o.zone] = o.zoneinfo 
       			 	});var Obj15 = [];
       			 doc.forEach(function(o){if (o.state == 'Jharkhand') Obj15.push(o);} );
       			 var b10 = {state :"Jharkhand"};
       			 Obj15.forEach(function(o,index){ //  console.log(o);
       			 	    b10[o.zone] = o.zoneinfo 
       			 	});var Obj16 = [];
       			 doc.forEach(function(o){if (o.state == 'Karnataka') Obj16.push(o);} );
       			 var b10 = {state :"Karnataka"};
       			 Obj16.forEach(function(o,index){ //  console.log(o);
       			 	    b10[o.zone] = o.zoneinfo 
       			 	});var Obj17 = [];
       			 doc.forEach(function(o){if (o.state == 'Kerala') Obj17.push(o);} );
       			 var b11 = {state :"Kerala"};
       			 Obj17.forEach(function(o,index){ //  console.log(o);
       			 	    b11[o.zone] = o.zoneinfo 
       			 	});var Obj18 = [];
       			 doc.forEach(function(o){if (o.state == 'Lakshadweep') Obj18.push(o);} );
       			 var b12 = {state :"Lakshadweep"};
       			 Obj18.forEach(function(o,index){ //  console.log(o);
       			 	    b12[o.zone] = o.zoneinfo 
       			 	});var Obj19 = [];
       			 doc.forEach(function(o){if (o.state == 'MadhyaPradesh') Obj19.push(o);} );
       			 var b13 = {state :"MadhyaPradesh"};
       			 Obj19.forEach(function(o,index){ //  console.log(o);
       			 	    b13[o.zone] = o.zoneinfo 
       			 	});var Obj20 = [];
       			 doc.forEach(function(o){if (o.state == 'Maharashtra') Obj20.push(o);} );
       			 var b14 = {state :"Maharashtra"};
       			 Obj20.forEach(function(o,index){ //  console.log(o);
       			 	    b14[o.zone] = o.zoneinfo 
       			 	});var Obj21 = [];
       			 doc.forEach(function(o){if (o.state == 'Manipur') Obj21.push(o);} );
       			 var b15 = {state :"Manipur"};
       			 Obj21.forEach(function(o,index){ //  console.log(o);
       			 	    b15[o.zone] = o.zoneinfo 
       			 	});var Obj22 = [];
       			 doc.forEach(function(o){if (o.state == 'Meghalaya') Obj22.push(o);} );
       			 var b16 = {state :"Meghalaya"};
       			 Obj22.forEach(function(o,index){ //  console.log(o);
       			 	    b16[o.zone] = o.zoneinfo 
       			 	});var Obj23 = [];
       			 doc.forEach(function(o){if (o.state == 'Mizoram') Obj23.push(o);} );
       			 var b17 = {state :"Mizoram"};
       			 Obj23.forEach(function(o,index){ //  console.log(o);
       			 	    b17[o.zone] = o.zoneinfo 
       			 	});var Obj24 = [];
       			 doc.forEach(function(o){if (o.state == 'Nagaland') Obj24.push(o);} );
       			 var b18 = {state :"Nagaland"};
       			 Obj24.forEach(function(o,index){ //  console.log(o);
       			 	    b18[o.zone] = o.zoneinfo 
       			 	});  var Obj25 = [];
       			 doc.forEach(function(o){if (o.state == 'Odisha') Obj25.push(o);} );
       			 var b19 = {state :"Odisha"};
       			 Obj25.forEach(function(o,index){ //  console.log(o);
       			 	    b19[o.zone] = o.zoneinfo 
       			 	}); var Obj26 = [];
       			 doc.forEach(function(o){if (o.state == 'Puducherry') Obj26.push(o);} );
       			 var b20 = {state :"Puducherry"};
       			 Obj26.forEach(function(o,index){ //  console.log(o);
       			 	    b20[o.zone] = o.zoneinfo 
       			 	});  var Obj27 = [];
       			 doc.forEach(function(o){if (o.state == 'Punjab') Obj27.push(o);} );
       			 var b22 = {state :"Punjab"};
       			 Obj27.forEach(function(o,index){ //  console.log(o);
       			 	    b22[o.zone] = o.zoneinfo 
       			 	}); var Obj28 = [];
       			 doc.forEach(function(o){if (o.state == 'Rajasthan') Obj28.push(o);} );
       			 var b23 = {state :"Rajasthan"};
       			 Obj28.forEach(function(o,index){ //  console.log(o);
       			 	    b23[o.zone] = o.zoneinfo 
       			 	}); var Obj29 = [];
       			 doc.forEach(function(o){if (o.state == 'Sikkim') Obj29.push(o);} );
       			 var b24 = {state :"Sikkim"};
       			 Obj29.forEach(function(o,index){ //  console.log(o);
       			 	    b24[o.zone] = o.zoneinfo 
       			 	}); var Obj30 = [];
       			 doc.forEach(function(o){if (o.state == 'TamilNadu') Obj30.push(o);} );
       			 var b25 = {state :"TamilNadu"};
       			 Obj30.forEach(function(o,index){ //  console.log(o);
       			 	    b25[o.zone] = o.zoneinfo 
       			 	});var Obj31 = [];
       			 doc.forEach(function(o){if (o.state == 'Telangana') Obj31.push(o);} );
       			 var b26 = {state :"Telangana"};
       			 Obj31.forEach(function(o,index){ //  console.log(o);
       			 	    b26[o.zone] = o.zoneinfo 
       			 	});var Obj32 = [];
       			 doc.forEach(function(o){if (o.state == 'Tripura') Obj32.push(o);} );
       			 var b21 = {state :"Tripura"};
       			 Obj32.forEach(function(o,index){ //  console.log(o);
       			 	    b21[o.zone] = o.zoneinfo 
       			 	});var Obj33 = [];
       			 doc.forEach(function(o){if (o.state == 'UttarPradesh') Obj33.push(o);} );
       			 var b27 = {state :"UttarPradesh"};
       			 Obj33.forEach(function(o,index){ //  console.log(o);
       			 	    b27[o.zone] = o.zoneinfo 
       			 	}); var Obj34 = [];
       			 doc.forEach(function(o){if (o.state == 'Tripura') Obj34.push(o);} );
       			 var b28 = {state :"Tripura"};
       			 Obj34.forEach(function(o,index){ //  console.log(o);
       			 	    b28[o.zone] = o.zoneinfo 
       			 	}); var Obj35 = [];
       			 doc.forEach(function(o){if (o.state == 'Uttarakhand') Obj35.push(o);} );
       			 var b29 = {state :"Uttarakhand"};
       			 Obj35.forEach(function(o,index){ //  console.log(o);
       			 	    b29[o.zone] = o.zoneinfo 
       			 	});  var Obj36 = [];
       			 doc.forEach(function(o){if (o.state == 'WestBengal') Obj36.push(o);} );
       			 var b30 = {state :"WestBengal"};
       			 Obj36.forEach(function(o,index){ //  console.log(o);
       			 	    b30[o.zone] = o.zoneinfo 
       			 	});


				 return res.render('viewReport', {error : false,  bihar : simpleBihar, gujarat:simple1, andman:simple2, an:simple3,
                  ar:simple4, as:simple5, x1:simple6, x2:simple7, x3:simple8, x4:simple9, x5:simple10,
                  x6:simple11, x7:b7, x8:b8, x9:b9,x10:b10, x11:b11, x12:b12, x13:b13, x14:b14, x15:b15,
                  x16:b16, x17:b17, x18:b18, x19:b19, x20:b20, x21:b21, x22:b22, x23:b23, x24:b24, x25:b25,
                  x26:b26, x27:b27, x28:b28, x29:b29, x30:b30
				 });
			}
    	});
  }

}  