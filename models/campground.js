var mongoose   = require("mongoose");

var campgroundSchema = new mongoose.Schema({
    name: String,
    thumb_image: String,
    main_image: String,
    price: String,
    location: String,
    physical_address: String,    
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }    
    ],
    address: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address"
        }    
    ]
});

module.exports = mongoose.model("Campground",campgroundSchema);