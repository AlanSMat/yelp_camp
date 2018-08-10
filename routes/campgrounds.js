var express    = require("express")
var router     = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment    = require("../models/comment");
var Address    = require("../models/address");
var middleware = require("../middleware");
var jsApiKey   = "AIzaSyB_W3BNS5iV6vpuKMYGeCw2FJYQ-VJ8pjc";

//CAMPGROUNDS INDEX
router.get("/", function(req, res) {
    Campground.find({},function(err, allCampgrounds){
        if(err) {
            console.log(err)
        } else { 
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
    });
});

//CAMPGROUNDS NEW
router.get("/new", middleware.isLoggedIn, function(req,res){
    //req.flash("error","You need to be logged in!");
    res.render("campgrounds/new");
});

//CAMPGROUNDS CREATE POST
router.post("/", middleware.isLoggedIn, function(req, res){

    var newCampground    = req.body.campground;
    newCampground.author = {
        id: req.user._id,
        username: req.user.username
    };

    //create a new campground and save to db
    Campground.create(newCampground, function(err, newlyCreated) {
        if(err) {
            console.log(err);    
        } else {            
            req.flash("success","Campground added successfully!");
            res.redirect("/campgrounds/" + newlyCreated._id + "/address/new");
        }
    });
});

//CAMPGROUNDS SHOW - shows more info about one campground
router.get("/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").populate("addresses").exec(function(err, foundCampground) {
        if(err || !foundCampground) {
            console.log(err);
            req.flash("error", "Campground not found!");
            res.redirect("back");
        } else {            
            res.render("campgrounds/showTest", {campground: foundCampground}); 
        }
    });    
});

//CAMPGROUNDS EDIT
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {                    
            req.flash("success","Campground edited successfully!");            
            res.render("campgrounds/edit",{campground: foundCampground});
        }
    });        
});

//CAMPGROUNDS UPDATE
router.put("/:id", middleware.checkCampgroundOwnership, function(req,res,next){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {            
            var addressId = updatedCampground.address[0];
            req.flash("success","Campground updated successfully!");
            res.redirect("/campgrounds/" + req.params.id + "/address/" + addressId + "/edit");
        }
    })
});

//DESTROY
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            console.log(err);
        } else {
            req.flash("success","Campground deleted successfully!");
            res.redirect("/campgrounds");    
        }
        
    })
});

module.exports = router;