
//crypto-used to generate a secure string
const crypto=require("crypto");
const ShareLink=require("../models/ShareLink");
const Document=require("../models/Document");

const createShareLink=async(req,res)=>{
    try{
        const docId=req.params.docId;
        const doc=await Document.findById(docId);
        //if doc doesn't exist

        if(!doc){
            return res.status(404).json({
                message:"Document not found"
            })
        }

        //check if doc belongs to current user
        if(doc.user.toString()!==req.user){
            return res.status(403).json({
                message:"Not authorized"
            })
        }

        //create token
        const token=crypto.randomBytes(32).toString("hex");

        //decide when the link expires in milliseconds
        const expiresAt=new Date(Date.now()+24*60*60*1000);

        //create shrelink
        const shareLink=await ShareLink.create({
            document:docId,
            token,
            expiresAt,
        })

        const shareUrl=`${req.protocol}://${req.get("host")}/api/share/${token}`;
        res.status(201).json({
            message:"Share Link created Successfully",
            shareUrl,
            expiresAt
        })
    }
    catch(err){
        console.log("Error in creating a shre link",err);
        res.status(500).json({
            message:"Error in creating a share link"
        })
    }
}

//access shared link

const accessSharedDocument=async(req,res)=>{
    try{
        const {token}=req.params;
        const shareLink=await ShareLink.findOne({token}).populate("document");
        if(!shareLink){
            return res.status(404).json({
                message:"Invalid or expired Link"
            })
        }
        if(shareLink.expiresAt<new Date()){
            res.status(410).json({
                message:"Link has expired"
            })
        }
        res.status(200).json({
            fileUrl:shareLink.document.fileUrl,
            fileType:shareLink.document.fileType,
            title:shareLink.document.title

        })
    }
    catch(err){
         console.log("Access shared document error:", err);
         res.status(500).json({ message: "Failed to access shared document" });
    }
}

module.exports={createShareLink,accessSharedDocument};