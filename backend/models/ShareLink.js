const mongoose=require("mongoose");

const shareLinkSchema=new mongoose.Schema({
    document:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Document",
        required:true
    },
    token:{
        type:String,
        required:true,
        unique:true
    },
    expiresAt:{
        type:Date,
        required:true
    }
},{timestamps:true});
module.exports=mongoose.model("ShareLink",shareLinkSchema)