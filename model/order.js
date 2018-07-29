var mongoose=require("mongoose");
var order =new mongoose.Schema({
    totalQuantity:Number,
    side:String,
    split:Number,
    note:String,
    price:Number
});

module.exports=mongoose.model("order",order);