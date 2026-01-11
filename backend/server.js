require("dotenv").config();
const express=require("express");
const app=express();
const authRoutes=require("./routes/authRoutes")
const uploadRoutes=require("./routes/documentRoutes")
const PORT=process.env.PORT || 3000;
const connectToDB=require("./database/db");
connectToDB()
app.use(express.json());
app.use("/api/auth",authRoutes)
app.use("/api/documents",uploadRoutes)


app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})