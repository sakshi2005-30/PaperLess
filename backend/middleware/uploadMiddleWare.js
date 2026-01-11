const multer=require("multer");

//store file in memory(RAM)

const storage=multer.memoryStorage();

//allow only images and pdf

const fileFilter=(req,file,cb)=>{
    console.log("uploaded file type",file.mimetype)
    if(file.mimetype.startsWith("image/")|| file.mimetype==="application/pdf"){
        cb(null,true);
    }
    else{
        cb(new Error("Only images and pdf allowed"),false);
    }
}

//maxfilesize is 5mb

const upload=multer({
    storage,
    limits:{fileSize:5*1024 *1024},
    fileFilter,
})
module.exports=upload;