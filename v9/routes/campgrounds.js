var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

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

router.post("/",middleware.isLoggedIn,(req,res)=>{
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

router.get("/new",middleware.isLoggedIn,(req,res)=>{
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
});

router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findById(req.params.id, function(err,campground){
        res.render("campgrounds/edit",{campground:campground});
    });
});

router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updated_campground){
        if(err){
            res.redirect("/campgrounds");
        }        
        else{
            res.redirect("/campgrounds/" + req.params.id);
        };
    })
});

router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findOneAndDelete(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds");
        }
    })
});

module.exports = router;