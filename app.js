var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    request        = require("request"),
    mongoose       = require("mongoose"),
    flash          = require("connect-flash"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    Campground     = require("./models/campground"),
    Comment        = require("./models/comment"),    
    Address        = require("./models/address"),
    User           = require("./models/user"),
    seedDB         = require("./seeds.js");

//requiring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    addressRoutes    = require("./routes/address"),
    indexRoutes      = require("./routes/index");

var dbUrl = "mongodb://localhost:27017/yelp_camp";
//var dbUrl = "mongodb://stevedbm:B4ttl3ForD@cluster0-shard-00-00-dmfzn.mongodb.net:27017,cluster0-shard-00-01-dmfzn.mongodb.net:27017,cluster0-shard-00-02-dmfzn.mongodb.net:27017/yelp_camp_rm?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";

console.log(process.env.DBURL);

mongoose.connect(process.env.DBURL,{ useNewUrlParser: true },function(err, db){
    if(err) {
        throw err
    } else {
       console.log("Connected to db " + db.name); 
    }
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({ 
    secret: "I love my cats Loki and Diggy",
    resave: false,
    saveUninitialized: false 
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error       = req.flash("error");
    res.locals.success     = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds/:id/address",addressRoutes);

var port = process.env.PORT || 8081; 
app.listen(port, process.env.IP, function() {
    console.log("Server has started on port " + port + "!!");
});