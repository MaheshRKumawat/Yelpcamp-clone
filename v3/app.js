var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require('mongoose'),
    Campground = require("./models/campground");
    seedDB = require("./seeds");

seedDB();

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");

mongoose.connect('mongodb://localhost:27017/yelp_camp_v3', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));



// Campground.create(
//     {
//         name:"Granite Hill",
//         image: "https://photosforclass.com/download/pb_1851092",
//         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae semper purus, id laoreet urna. Praesent vel ante eget libero maximus molestie. Suspendisse elementum accumsan gravida. Integer ultrices imperdiet commodo."
//     }
//     ,function(err,campground){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("Newly created campground");
//         console.log(campground);
//     }
// })

app.get("/",(req,res)=>{
    res.render("landing");
});

app.get("/campgrounds",(req,res)=>{
    Campground.find({},function(err,campgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("index",{campgrounds:campgrounds})
        }
    })
});

app.post("/campgrounds",(req,res)=>{
    var name=req.body.name;
    var image=req.body.image;
    var description=req.body.description;
    var newcampground={name:name, image:image, description:description};
    Campground.create(newcampground,function(err,campground){
            if(err){
                console.log(err);
            }
            else{
                console.log("Newly created campground");
                res.redirect("/campgrounds");
            }
        })
});

app.get("/campgrounds/new",(req,res)=>{
    res.render("new");
});

app.get("/campgrounds/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            console.log(campground);
            res.render("show",{campground:campground});
        }
    })
})

app.listen(3000,()=>{
    console.log("server v3 started");
});
