const User=require("../models/user");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken")

//register user
const registerUser=async(req,res)=>{
    try{
        const {name,email,password}=req.body;

        //check for any missing field
        if(!name || !email || !password){
            return res.status(400).json({
                message:"All fields  are required"
            })
        }
        //check if user already exists
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message:"User already exists"
            })
        }
        //hash password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        //create user
        const user=await User.create({
            name,
            email,
            password:hashedPassword
        })
        //create token
        const token=jwt.sign({id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"30d"}
        )

        //send response of user
        return res.status(201).json({
            message:"User registered success",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }
        })
    }
    catch(err){
        console.log("Register Error:",err);
        return res.status(500).json({
            message:"Server error"
        });
    }
}

//login user
const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        //check for missing fields
        
        if(!email || !password){
            return res.status(400).json({
                message:"All fields are required"
            })
        }

        //check if user exists
        const user=await User.findOne({email:email.toLowerCase().trim()})
        
    //if user not exits
        if(!user){
            return res.status(400).json({
                message:"Invalid email or password"
            })
        }

        //compare hashed password
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                message:"Invalid email or pasword"
            })
        }
        //generate jwt
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"30d"});

        //send response
        return res.status(200).json({
            message:"User loggged in successfully",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
            }
        })
    }
    catch(err){
        console.log("Login error",err);
        return res.status(500).json({
            message:"Server Error"
        })
    }

}
module.exports={registerUser,loginUser}