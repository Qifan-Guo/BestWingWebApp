var mongoose=require("mongoose");
var priceCheck =new mongoose.Schema({
    itemName:String,
    price:Number
});

module.exports=mongoose.model("priceCheck",priceCheck);