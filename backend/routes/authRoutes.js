const express=require("express");
const router=express.Router();
const {registerUser,loginUser}=require("../controllers/authController");
const protect=require("../middleware/authMiddleWare")

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/get",protect,(req,res)=>{
    res.status(200).json({
        message:"user is authenticated"
    })
})
module.exports=router;