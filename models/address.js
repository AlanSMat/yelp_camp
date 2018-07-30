var mongoose   = require("mongoose");

var addressSchema = new mongoose.Schema({
    street_address: String,    
    city: String,
    suburb: String,
    postcode: String,
    country: String
});

module.exports = mongoose.model("Address", addressSchema);