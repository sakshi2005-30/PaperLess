const mongoose=require("mongoose");
const connectToDB=async()=>{
    try{
        console.log("MONGO_URI", process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected successfully");
    }
    catch(err){
        console.log("Error occured in database",err);
        process.exit(1);
    }
}
module.exports=connectToDB