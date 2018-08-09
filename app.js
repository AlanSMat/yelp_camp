var express    = require("express"),
    app        = express(),
    request    = require("request"),
    mongoose   = require("mongoose"),
	bodyParser = require("body-parser");

app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
 
var dbUrl = "mongodb://stevedbm:B4ttl3ForD@cluster0-shard-00-00-dmfzn.mongodb.net:27017,cluster0-shard-00-01-dmfzn.mongodb.net:27017,cluster0-shard-00-02-dmfzn.mongodb.net:27017/yelp_camp_rm?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";

mongoose.connect(dbUrl,{ useNewUrlParser: true },function(err, db){
    if(err) {
        throw err
    } else {
       console.log("Connected to db " + db.name);        
    }
});

app.get("/", function(req, res){    
    //lookup campground using ID
    res.render("index.ejs");
});

app.get("/about", function(req, res){    
    //lookup campground using ID
    res.render("about.ejs");
});

//console.log(process.env.PORT);

var port = process.env.PORT || 8080; 
app.listen(port, process.env.IP, function() {
    console.log("Server has started on port " + port + "!!");
});
