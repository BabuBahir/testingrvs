var buildingType = require("../models/buildingType.js");
var cloudinary = require('cloudinary'); 

cloudinary.config({
    cloud_name: 'dcu5hz0re',
    api_key: '812825971867232',
    api_secret: '_pk-gzAhdI63mSU1FDXIkrXkABo'
});

var dummyData = "";var imgurlArray=[]; 
 
module.exports = {
  index: function (req, res) {             
      buildingType.find({}).sort({'orderIndex':-1}).exec(function(err,data){  
        res.render('building_Type _coudinary',{
            Masonry_names:data[3].name , Masonry_desc:data[3].description , Masonry_img:data[3].buildingImgUrl , Masonry_vid:data[3].buildingVideoUrl ,
            Rcc_names:data[1].name , Rcc_desc:data[1].description , Rcc_img : data[1].buildingImgUrl , Rcc_vid : data[1].buildingVideoUrl ,
            Steel_names:data[2].name , Steel_desc:data[2].description , Steel_img : data[2].buildingImgUrl , Steel_vid : data[2].buildingVideoUrl ,
            Comp_names:data[0].name , Comp_desc:data[0].description , Comp_img : data[0].buildingImgUrl , Comp_vid : data[0].buildingVideoUrl 
          });                     
      });        
  },
  create: function (req, res) {   
     if(req.files.image_masonry.type=="image/jpeg") {   // check if image is uploaded... if yes upload to cloudinary..else redirect        
           cloudinary.v2.uploader.upload(req.files.image_masonry.path,
                { width: 300, height: 300, crop: "limit", tags: req.body.tags, moderation:'manual' },
                function(err, result) {        // call back after uploading image to cloudinary                     
                    buildingType.find({_id: req.body["selectedTab"]}, function(err, test){                                        
                        if(err){res.send(err)};                   
                        test[0].buildingImgUrl.push({imgUrl:result.url,_id:result.public_id});
                        imgurlArray = test[0].buildingImgUrl;                                                          
                        buildingType.findOneAndUpdate({_id: req.body["selectedTab"]}, { $set: { buildingImgUrl: imgurlArray}}, { new: true }, function (err, tank) {
                        if (err) return handleError(err);                      
                         // res.redirect('/buildingType');       NEVER RETURN ,, NEVER !!!!
                        }); 
                     
                  });
            });
        };
      
       console.log(req.files.image_masonry.type);  
      if ((req.files.image_masonry.size >0) && ((req.files.image_masonry.type =='application/octet-stream') || (req.files.image_masonry.type =='video/mp4'))) {  // check if video is present                          
            cloudinary.uploader.upload_large(req.files.image_masonry.path, 
            function(result) {            // call back after uploading video to cloudinary 
                result.url=(result.url).replace("mp4","jpg");    // replacing .mp4 by its .jpg                        
                buildingType.find({_id: req.body["selectedTab"]}, function(err, test){                                        
                        if(err){res.send(err)};                   
                        test[0].buildingVideoUrl.push({videoUrl:result.url,_id:result.public_id});
                        imgurlArray = test[0].buildingVideoUrl;                                                          
                        buildingType.findOneAndUpdate({_id: req.body["selectedTab"]}, { $set: { buildingVideoUrl: imgurlArray}}, { new: true }, function (err, tank) {
                        if (err) return handleError(err);                      
                        res.redirect('/buildingType');             
                        }); 
                     
                  });               
            }, 
            
            { resource_type: "video" });  
        } else {           
        res.redirect('/buildingType');
      };
   },
   destory: function (req, res) {               
      var imageId = req.body.image_id;  
      cloudinary.v2.uploader.destroy(imageId, function (error, result) { 
                buildingType.update({_id: req.body["BuildingType"]}, { $pull: { buildingImgUrl : { _id : imageId } } },{ safe: true }, function(err, test){                                        
                        if(err){res.send(err)};                                           
                        res.send("done");
                  });
          });
   },

   destory_video:function(req,res){
      var videoId = req.body.video_id;  
      cloudinary.uploader.destroy(videoId, function (error, result) {   
                buildingType.update({_id: req.body["BuildingType"]}, { $pull: { buildingVideoUrl : { _id : videoId } } },{ safe: true }, function(err, test){                                        
                        if(err){res.send(err)};                                            
                        res.send("done");
                  });
          }, { resource_type: "video" });
   } ,


   DynamicImageUpdate : function(req,res) {
     var result = req.body.data;

      buildingType.find({_id: req.body["selectedTab"]}, function(err, test){                                         
                    if(err){res.send(err)};                   
                        test[0].buildingImgUrl.push({imgUrl:result.url,_id:result.public_id});
                        imgurlArray = test[0].buildingImgUrl;                                                          
                        buildingType.findOneAndUpdate({_id: req.body["selectedTab"]}, { $set: { buildingImgUrl: imgurlArray}}, { new: true }, function (err, tank) {
                    if (err) return handleError(err);                      
                         // res.redirect('/buildingType');       NEVER RETURN ,, NEVER !!!!
                        }); 
                     
      });

   }

};