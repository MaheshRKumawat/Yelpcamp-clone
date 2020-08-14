var mongoose=require("mongoose");
var Campground=require("./models/campground");
var Comment=require("./models/comment");

var data=[
    {
        name: "Mountain",
        image: "https://photosforclass.com/download/pb_1851092",
        description: "blan blah blah"
    },
    {
        name: "Yoho ho",
        image: "https://photosforclass.com/download/pb_5302236",
        description: "blan blah blah"
    },
    {
        name: "Beach",
        image: "https://photosforclass.com/download/px_2419278",
        description: "blan blah blah"
    }
]



function seedDB(){
    Campground.deleteMany({},function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("removed Campgrounds");
            data.forEach(function(seed){
                Campground.create(seed,function(err,campground){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("Added a campground");
                        Comment.create(
                            {
                                text: "This is a great place!!! OK",
                                author: "Colt"
                            },function(err,comment){
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new Comment");
                                }
                            }
                        )
                    }
                })
            });  
        }
    });    
}

module.exports = seedDB;
