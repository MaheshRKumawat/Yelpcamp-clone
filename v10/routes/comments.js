var express = require("express");
var router = express.Router({mergeParams:true});
var Campground = require("../models/campground");
var Comment = require('../models/comment');
var middleware = require("../middleware");
//we don't have to do ../middleware/index because index.js is a special in node and it will be called

router.get("/new",middleware.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new",{campground:campground});
        }
    })
});

router.post("/",function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    req.flash("error","Something went Wrong");
                }
                else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success","Successfully added comment");
                    res.redirect("/campgrounds/"+campground._id);
                }
            })
        }
    })
});

router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err || !foundCampground){
            req.flash("error","Campground Not found");
            return res.redirect("back");
        }
        Comment.findById(req.params.comment_id,function(err,foundComment){
            if(err){
                res.redirect("back");
            }
            else{
                res.render("comments/edit",{campground_id: req.params.id, comment: foundComment});
            }
        });
    })
    //req.params.id is that particular campground's id
    //req.params.comment_id is that particular campground's comment id
});

router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,UpdatedComment){
        if(err){
            res.redirect("back");
        }
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndDelete(req.params.comment_id,function(err){
        if(err){
            res.redirect("back");
        }
        else{
            req.flash("success","Successfully deleted comment");
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
});

module.exports = router;