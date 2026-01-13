const express=require("express");
const router=express.Router();
const {createShareLink,accessSharedDocument}=require("../controllers/ShareController");

const protect=require("../middleware/authMiddleWare")

//create shrelink
router.post("/:docId",protect,createShareLink);

//access shared dodument
router.get("/:token",accessSharedDocument)
module.exports=router;