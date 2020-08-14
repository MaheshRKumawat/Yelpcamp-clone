var mongoose=require("mongoose");
var Campground=require("./models/campground");
var Comment=require("./models/comment");

var data=[
    {
        name: "Mountain",
        image: "https://photosforclass.com/download/pb_1851092",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    },
    {
        name: "Yoho ho",
        image: "https://photosforclass.com/download/pb_5302236",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    },
    {
        name: "Beach",
        image: "https://photosforclass.com/download/px_2419278",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    }
]



function seedDB(){
    Campground.deleteMany({},function(err){
        // if(err){
        //     console.log(err);
        // }
        // else{
        //     console.log("removed Campgrounds");
        //     data.forEach(function(seed){
        //         Campground.create(seed,function(err,campground){
        //             if(err){
        //                 console.log(err);
        //             }
        //             else{
        //                 console.log("Added a campground");
        //                 Comment.create(
        //                     {
        //                         text: "This is a great place!!! OK",
        //                         author: "Colt"
        //                     },function(err,comment){
        //                         if(err){
        //                             console.log(err);
        //                         }
        //                         else{
        //                             campground.comments.push(comment);
        //                             campground.save();
        //                             console.log("Created new Comment");
        //                         }
        //                     }
        //                 )
        //             }
        //         })
        //     });  
        // }
    });    
}

module.exports = seedDB;
