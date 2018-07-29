var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    
    username: String,
    password:String,
    order:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order"
    }]
});

UserSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("User",UserSchema);