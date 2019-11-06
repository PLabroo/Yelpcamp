var express = require("express");
var app = express();
var bodyparser= require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var passport = require("passport");
var flash =require("connect-flash");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var Comment = require("./models/comment");
var User = require("./models/user");
var seedDB = require("./seeds");

var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");


mongoose.connect('mongodb://localhost/yelp_camp', {useNewUrlParser: true});
// mongoose.connect('mongodb+srv://Prateek:nitin@123@cluster0-sdqma.mongodb.net/test?retryWrites=true&w=majority',{
// 	useNewUrlParser: true,
// 	useCreateIndex: true
// }).then(()=>{
// 	console.log("Connected to DB!");
// }).catch(err =>{
// 	console.log("ERROR",err.message);
// });
//mongodb+srv://Prateek:nitin@123@cluster0-sdqma.mongodb.net/test?retryWrites=true&w=majority

app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB(); //seed the database

//ADDING AUTHENTICATION

app.use(require("express-session")({
	secret:"Once agains Rusty wins the cutest dog!",
	resave:false,
	saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


 app.use(function(req,res,next){
 	res.locals.currentUser = req.user;
	res.locals.danger = req.flash("danger");
	res.locals.success = req.flash("success");
 	next();
 });


app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

app.listen(4000, function(){
	console.log("Yelpcamp server has started!!");
});