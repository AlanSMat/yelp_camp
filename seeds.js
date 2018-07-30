var mongoose   = require("mongoose");
var Campground = require("./models/campground");
var Comment    = require("./models/comment");
var Address    = require("./models/address");
//var User       = require("./models/comment");

var data = [
    {
        name: "Whangateau Holiday Park",
        thumb_image: "https://farm1.nzstatic.com/_proxy/imageproxy_1y/serve/view-from-campground.jpg?backgroundcolour=white&height=169&outputformat=jpg&quality=75&source=2476972&transformationratio=1.3&transformationsystem=autoboxfit&width=300&securitytoken=9667C11D995F779CB12E9BB777933306",
        main_image: "https://farm1.nzstatic.com/_proxy/imageproxy_1y/serve/view-from-campground.webp?height=530&outputformat=webp&quality=80&source=2476972&transformationratio=1.3&transformationsystem=autoboxfit&width=940&securitytoken=D85886A86BD77ED785D49EE09DF43C56",
        description: "Relax and unwind at this tranquil waterfront holiday park. Powered sites, cabins, units, self contained access…"
    },
    {
        name: "Waikaremoana Holiday Park",
        thumb_image: "https://farm1.nzstatic.com/_proxy/imageproxy_1y/serve/home-bay---view-from-chalets.jpg?backgroundcolour=white&height=169&outputformat=jpg&quality=75&source=2530222&transformationratio=1.3&transformationsystem=autoboxfit&width=300&securitytoken=2D652C5C5B86ECBDD2DD578EF86F72A9",
        main_image: "https://farm1.nzstatic.com/_proxy/imageproxy_1y/serve/waikaremoana-holdiday-park-and-view-of-lake.webp?height=530&outputformat=webp&quality=80&source=1544978&transformationratio=1.3&transformationsystem=autoboxfit&width=940&securitytoken=C8645504325D52EA4C40FDC9FDBF61AA",
        description: "The only accommodation on the shores of Lake Waikaremoana, Te Urewera with amazing views of the lake and nativ…"
    },
    {
        name: "Picton Campervan Park",
        thumb_image: "https://farm1.nzstatic.com/_proxy/imageproxy_1y/serve/newzealand-image.jpg?backgroundcolour=white&height=169&outputformat=jpg&quality=75&source=3770554&transformationratio=1.3&transformationsystem=autoboxfit&width=300&securitytoken=176DBE3F3185B2E76A2826CC1B2188D4",
        main_image: "https://farm1.nzstatic.com/_proxy/imageproxy_1y/serve/picton-campervan-park.webp?height=530&outputformat=webp&quality=80&source=1459036&transformationratio=1.3&transformationsystem=autoboxfit&width=940&securitytoken=CF2D691E6D8F6B65A4C502994DCCD927",
        description: "Arriving or leaving by ferry couldnt be easier with the ferry terminal less than a 2 minute drive away. Our central location means we are just a short walk from Picton’s picturesque waterfront, cafes & restaurants and all activities and attractions."
    },
    {
        name: "Whangarei Falls Holiday Park",
        thumb_image: "https://farm1.nzstatic.com/_proxy/imageproxy_1y/serve/whangarei-fallsjpg.jpg?backgroundcolour=white&height=169&outputformat=jpg&quality=75&source=3127858&transformationratio=1.3&transformationsystem=autoboxfit&width=300&securitytoken=5D5C3DE3FBC764A9DC9DB880F83E00D8",
        main_image: "https://farm1.nzstatic.com/_proxy/imageproxy_1y/serve/beautiful-whangarei-falls.jpg?height=406&outputformat=jpg&quality=85&source=3127859&transformationratio=1.3&transformationsystem=autoboxfit&width=720&securitytoken=1757562B243DB31FDC9A71998D9BE6A0",
        description: "We are a cosy holiday park and backpackers in a semi-rural setting two-minutes’ walk away from the beautiful Whangarei Falls and scenic walking tracks. Stroll to town along bush-lined riverside walks, or laze the day away beside the swimming pool. Evenings are for soaking in the hot tub and sharing stories around the BBQ."
    }
]

function seedDB() {
    //remove all comments
    Comment.remove({},function(err){
        if(err) {
            console.log(err);
        } else {
            //console.log("Removed all comments");
        }
    });
    /*Address.remove({},function(err){
        if(err) {
            console.log(err);
        } else {
            //console.log("Removed all comments");
        }
    });*/
    //remove all campgrounds
    Campground.remove({}, function(err){
        if(err) {
            console.log(err);
        } else {
            console.log("removed campgrounds");
            // data.forEach(function(seed){
            //     Campground.create(seed, function(err, campground) {
            //         if(err) {
            //             console.log(err);
            //         } else {
            //             console.log("added a campground");
            //             Comment.create(
            //                 {
            //                     text: "This place is great",
            //                     author: "Homer"
            //                 }, function(err,comment) {
            //                     if(err) {
            //                         console.log(err);
            //                     } else {
            //                         campground.comments.push(comment);
            //                         //console.log("comment pushed onto campground " + campground.name);
            //                         campground.save();
            //                     }
            //                 }
            //             );
            //         } //* end else 
            //     });
            // });
        }
    });
};

module.exports = seedDB;