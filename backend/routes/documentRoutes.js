const express=require("express");
const router=express.Router();
const protect=require("../middleware/authMiddleWare");
const upload=require("../middleware/uploadMiddleWare");
const {uploadDocument,getDocuments,deleteDocument}=require("../controllers/documentController");

router.post("/upload",protect,upload.single("file"),uploadDocument)

router.get("/",protect,getDocuments)
router.delete("/:id",protect,deleteDocument);

module.exports=router;