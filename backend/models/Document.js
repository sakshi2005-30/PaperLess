const mongoose=require("mongoose");

const documentSchema=new mongoose.Schema({
    //which user uploaded
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    //name given by user
    title:{
        type:String,
        required:true
    },
    //cloudinary fileUrl
    fileUrl:{
        type:String,
        required:true
    },
    //publicId to delete the file
    publicId:{
        type:String,
        required:true
    },
    //file type
    fileType:{
        type:String,
        required:true
    }
},{timestamps:true});
module.exports=mongoose.model("Document",documentSchema)