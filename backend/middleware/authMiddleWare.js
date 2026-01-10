const jwt=require("jsonwebtoken");

const protect=async(req,res,next)=>{
    try{
        let token;
        //check if token exits
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            //get token
            token=req.headers.authorization.split(" ")[1];
            //verify token
            const decoded=jwt.verify(token,process.env.JWT_SECRET);

            //attach userid to reques
            req.user=decoded.id;
           
            next();
        }
        else{
            return res.status(401).json({
                message:"Not authorized,no token"
            })
        }
    }
    catch(err){
        console.log("Auth middleware  error",err);
        return res.status(401).json({
            message:"Not authorized,token failed"
        })

    }
}
module.exports=protect;