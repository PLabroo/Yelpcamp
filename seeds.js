var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
	 name:"Cloud's Rest'",
	 image:"https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
	 description:"Blah blah blah!"
	},
	{
	 name:"The bright sunshine",
	 image:"https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
	 description:"It's all sun and camps!"
	},
	{
	 name:"Beach Camp",
	 image:"https://images.pexels.com/photos/6757/feet-morning-adventure-camping.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
	 description:"Welcome to my beach camp!"
	}
	
];

function seedDB(){
	Campground.remove({}, function(err){
	if(err){
		console.log(err);
	}
	console.log("removed campgrounds!");
		
	data.forEach(function(seed){
	Campground.create(seed, function(err, campground){
		if(err){
			console.log(err);
		}else{
			console.log("added a campground!");
			
			Comment.create(
				{
				  text:"This place is great, but i wish there was internet",
				  author:"Homie"
			    },function(err, comment){
					if(err){
						console.log(err);
					}
					else{
						campground.comments.push(comment);
						campground.save();
						console.log("Created new comment!");
					}
				});
		}
	});
});
});





}
module.exports = seedDB;


