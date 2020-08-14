var express = require("express");
var app = express();
var bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");

var campgrounds=[
    {name:"Salmon Creek",image:"https://photosforclass.com/download/px_1230302"},
    {name:"Granite Hill",image:"https://photosforclass.com/download/px_1061640"},
    {name:"Mountain Goat's Rest",image:"https://photosforclass.com/download/px_1309584"},
    {name:"Salmon Creek",image:"https://photosforclass.com/download/px_1230302"},
    {name:"Granite Hill",image:"https://photosforclass.com/download/px_1061640"},
    {name:"Mountain Goat's Rest",image:"https://photosforclass.com/download/px_1309584"},
    {name:"Salmon Creek",image:"https://photosforclass.com/download/px_1230302"},
    {name:"Granite Hill",image:"https://photosforclass.com/download/px_1061640"},
    {name:"Mountain Goat's Rest",image:"https://photosforclass.com/download/px_1309584"}
];

app.get("/",(req,res)=>{
    res.render("landing");
});

app.get("/campgrounds",(req,res)=>{
    res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds",(req,res)=>{
    var name=req.body.name;
    var image=req.body.image;
    var newcampground={name:name, image:image};
    campgrounds.push(newcampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new",(req,res)=>{
    res.render("new");
});

app.listen(3000,()=>{
    console.log("server v1 started");
});
