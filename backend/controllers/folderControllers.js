const Folder=require("../models/Folder");
const Document=require("../models/Document");
const { get } = require("mongoose");

//create folder
const createFolder=async(req,res)=>{
    try{
        const {name}=req.body;
        if(!name){
            return res.status(400).json({
                message:"Folder name is required"
            })
        }

        //prevent making duplicate folders
        console.log("name:",name);
        // name=name.trim();
        const existing=await Folder.findOne({name,user:req.user});
        console.log("existing",existing);
        if(existing){
            return res.status(400).json({
                message:"Folder already exists"
            })
        }

        const folder=await Folder.create({
            name,
            user:req.user
        })

        res.status(201).json(folder)
    }
    catch(err){
        console.log("Create folder error",err);
        res.status(500).json({
            message:"Create folder error"
        })
    }
}

//get all folder
const getFolders=async(req,res)=>{
    try{
        const folders=await Folder.find({user:req.user}).sort({createdAt:-1})
        res.status(200).json(folders)
    }

    catch(err){
        console.log("Get folders error",err);
        res.status(500).json({
            message:"Error in fetching folders"
        })
    }
}

//delete folder

const deleteFolder=async(req,res)=>{
    try{
        const id=req.params.id;
        console.log("id:",id);
        const folder=await Folder.findById(id);
        console.log("folder",folder);
        if(!folder){
            return res.status(404).json({
                message:"Folder not found"
            })
        }
        if(folder.user.toString()!==req.user){
            return res.status(403).json({
                message:"Not authorized"
            })
        }
        await Document.updateMany(
          { folder: folder._id },
          { $set: { folder: null } }
        );

        await folder.deleteOne();
        res.json({ message: "Folder deleted successfully" });

    }
    catch(err){
        console.log("error in deleteing folder",err);
        res.status(500).json({
            message:"Failed to delete folder"
        })
    }
}

module.exports={createFolder,getFolders,deleteFolder}