var express    = require("express")
var router     = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment    = require("../models/comment");
var middleware = require("../middleware");

// COMMENTS NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    
    Campground.findById(req.params.id, function(err, campground){
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new",{campground: campground});     
        }
    });
    
});

// COMMENTS CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            //create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err) {
                    console.log(err);
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    //connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    //redirect campground show page
                    req.flash("success","New comment added!");
                    res.redirect("/campgrounds/" + campground._id)
                }    
            });
        }
    });
});

//COMMENTS EDIT
router.get("/:comment_id/edit", middleware.checkCommentsOwnership, function(req, res){
    //req.params.id is the id of the campground even tho we are in comments
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err || !foundCampground) {
            req.flash("error","Campground not found!");
            return res.redirect("back");
        }
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err) {
                console.log(err);
                res.redirect("back"); 
            } else {
                req.flash("success","Comment updated successfully!");
                res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});    
            }
        });
    });
});

//COMMENTS UPDATE
router.put("/:comment_id", middleware.checkCommentsOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, foundComment){
        if(err) {
            console.log(err);
        } else {
            req.flash("success","Comment updated successfully!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DESTROY
router.delete("/:comment_id", middleware.checkCommentsOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err) {
            console.log(err);
        } else {
            req.flash("success","Comment deleted successfully!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

module.exports = router;