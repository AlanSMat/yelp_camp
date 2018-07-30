var express    = require("express")
var router     = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Address    = require("../models/address");
var middleware = require("../middleware");

// ADDRESS NEW
router.get("/new", function(req, res){
    
    Campground.findById(req.params.id, function(err, campground){
        if(err) {
            console.log(err);
        } else {
            res.render("address/new",{campground: campground});     
        }
    });
    
});

// ADDRESS CREATE
router.post("/", middleware.isLoggedIn, function(req, res){    
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {            
            //create new address
            Address.create(req.body.address, function(err, address){
                 if(err) {
                     console.log(err);
                 } else {                    
                     //add username and id to comment
                     //address.author.id = req.user._id;                     
                     //address.author.username = req.user.username;
                     //save address                     
                     //address.save();
                     //connect new address to campground
                     //console.log(address);
                     campground.address.push(address);                     
                     campground.save();
                     console.log(campground.address);
                     //redirect campground show pager
                     req.flash("success","New Address added!");
                     res.redirect("/campgrounds/" + campground._id)
                 }    
            });
        }
    });
});

// router.post("/", middleware.isLoggedIn, function(req, res){
//     //lookup campground using ID
//     Campground.findById(req.params.id, function(err, campground){
//         if(err) {
//             console.log(err);
//             res.redirect("/campgrounds");
//         } else {
//             //create new comment
//             Comment.create(req.body.comment, function(err, comment){
//                 if(err) {
//                     console.log(err);
//                 } else {
//                     //add username and id to comment
//                     comment.author.id = req.user._id;
//                     comment.author.username = req.user.username;
//                     //save comment
//                     comment.save();
//                     //connect new comment to campground
//                     campground.comments.push(comment);
//                     campground.save();
//                     //redirect campground show page
//                     req.flash("success","New comment added!");
//                     res.redirect("/campgrounds/" + campground._id)
//                 }    
//             });
//         }
//     });
// });

//address EDIT middleware.checkAddressOwnership, 
router.get("/:address_id/edit", function(req, res){
    //req.params.id is the id of the address even tho we are in address    
    Address.findById(req.params.id, function(err, foundaddress){
        if(err || !foundaddress) {
            req.flash("error","address not found!");
            return res.redirect("back");
        }
        Address.findById(req.params.address_id, function(err, foundaddress){
            if(err) {
                console.log(err);
                res.redirect("back"); 
            } else {
                req.flash("success","address updated successfully!");
                res.render("address/edit", {address_id: req.params.id, address: foundaddress});    
            }
        });
    });
});

//address UPDATE
//router.put("/:comment_id", middleware.checkCommentsOwnership, function(req, res){
router.put("/:address_id", middleware.checkAddressOwnership, function(req, res){
    Address.findByIdAndUpdate(req.params.address_id, req.body.address, function(err, foundaddress){
        if(err) {
            console.log(err);
        } else {
            req.flash("success","address updated successfully!");
            res.redirect("/addresss/" + req.params.id);
        }
    });
});

// //DESTROY
// router.delete("/:address_id", middleware.checkaddressOwnership, function(req, res){
//     address.findByIdAndRemove(req.params.address_id, function(err){
//         if(err) {
//             console.log(err);
//         } else {
//             req.flash("success","address deleted successfully!");
//             res.redirect("/addresss/" + req.params.id);
//         }
//     })
// });

module.exports = router;
