 const express = require("express");
 const bodyParser = require("body-parser");
 const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/to_do_list");

var dayDate = null;
var mainItemList = [];
var workItemList = [];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const colorNames = ["#d6cbd3", "#eca1a6", "#e3eaa7", "#b5e7a0", "#034f84", "#c94c4c", "#80ced6"];
function getDayDate(){
    var date = new Date();
    var element = date.getDay();
    dayDate = weekNames[element];
    element = date.getDate();
    dayDate+=", " + element;

    element = date.getMonth();
    dayDate+=" " + monthNames[element];

    element = date.getFullYear()
    dayDate+=" " + element;
}

app.get("/", function(req, res){
    getDayDate();
    res.render("index", {date_time: dayDate, listLength:mainItemList.length, list_items:mainItemList, 
                itemBoxBGColor: colorNames, submitButtonValue:"Main", activeList: "Main"});

});

app.post("/", function(req, res){
    // console.log(req.body);
    if (req.body.submitButtonName == "Work"){
        var item = req.body.itemName;
        var randomColor = Math.floor(Math.random()*(colorNames.length-1));
        workItemList.push({"item_name": item, "item_color":colorNames[randomColor]});
        res.redirect("/work");
    }
    else if(req.body.submitButtonName == "Main"){
        var item = req.body.itemName;
        var randomColor = Math.floor(Math.random()*(colorNames.length-1));
        mainItemList.push({"item_name": item, "item_color":colorNames[randomColor]});
        res.redirect("/");
    }
});

app.get("/work", function(req, res){
    getDayDate();
    res.render("index", {date_time: dayDate, listLength:workItemList.length, list_items:workItemList,
                itemBoxBGColor:colorNames, submitButtonValue:"Work" , activeList: "Work"});
});

app.post("/delete", function(req, res){
    console.log(req.body);
});





app.listen(3000, function(){
    console.log("Server started successfully at port 3000.");
});