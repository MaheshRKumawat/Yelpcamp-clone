var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

router.get("/",(req,res)=>{
    Campground.find({},function(err,campgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index",{campgrounds:campgrounds})
        }
    })
});

router.post("/",isLoggedIn,(req,res)=>{
    var name=req.body.name;
    var image=req.body.image;
    var description=req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newcampground={name:name, image:image, description:description, author:author};
    Campground.create(newcampground,function(err,campground){
            if(err){
                console.log(err);
            }
            else{
                res.redirect("/campgrounds");
            }
        })
});

router.get("/new",isLoggedIn,(req,res)=>{
    res.render("campgrounds/new");
});

router.get("/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            console.log(campground);
            res.render("campgrounds/show",{campground:campground});
        }
    })
})

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;