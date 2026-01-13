const cloudinary=require("../config/cloudinary");

const Document=require("../models/Document");

const uploadDocument=async(req,res)=>{
    try{
        const {title,folderId}=req.body;
        console.log("REQ BODY:",req.body)
        //check file eixts
        if(!req.file){
            return res.status(400).json({
                message:"No file uploaded"
            })
        }

        //convert file to upload
        const fileStr=`data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`

        //upload to cloudinary
        const uploadResult=await cloudinary.uploader.upload(fileStr,{
            resource_type:"auto"
        });

        //save in mongodb

        const doc=await Document.create({
            user:req.user,
            title,
            fileUrl:uploadResult.secure_url,
            publicId:uploadResult.public_id,
            fileType:req.file.mimetype,
            folder:folderId||null
        })
        res.status(201).json(doc);
    }
    catch(err){
        console.log("Upload error:",err);
        res.status(500).json({message:"Upload failed"});
    }

}

const getDocuments=async(req,res)=>{
    try{
        const docs = await Document.find({ user: req.user }).sort({
          createdAt: -1,
        });
        res.status(200).json(docs);

    }
    catch(err){
        console.log("Get documents error",err);
        res.status(500).json({
            message:"Failed to fetch documents"
        })

    }
}

const deleteDocument=async(req,res)=>{
    try{
        const id=req.params.id;

        const doc=await Document.findById(id);

        //if doc not exits
        if(!doc){
            return res.status(404).json({
                message:"Document not found"
            })
        }
        //check if valid user
        if(doc.user.toString()!==req.user){
            return res.status(403).json({
                message:"Not authorized"
            })
        }

        //delete from cloudianry
        let resourceType="image"
        if(doc.fileType==="application.pdf"){
            resourceType="raw";
        }
        await cloudinary.uploader.destroy(doc.publicId,{
            resource_type:resourceType
        });

        //delete from mongodb
        await doc.deleteOne();
        res.status(200).json({
            message:"Document deleted successfully"
        })

    }
    catch(err){
        console.log("Delete documnet error",err);
        res.status(500).json({
            message:"Document delete error"
        })

    }
}
module.exports={uploadDocument,getDocuments,deleteDocument};