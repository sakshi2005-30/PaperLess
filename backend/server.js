require("dotenv").config();
const express=require("express");
const app=express();
const authRoutes=require("./routes/authRoutes")
const uploadRoutes=require("./routes/documentRoutes");
const folderRoutes=require("./routes/folderRoutes")

const shareRoutes=require("./routes/shareRoutes")
const PORT=process.env.PORT || 3000;
const connectToDB=require("./database/db");
connectToDB()
app.use(express.json());
app.use("/api/auth",authRoutes)
app.use("/api/documents",uploadRoutes)
app.use("/api/share",shareRoutes)
app.use("/api/folders",folderRoutes)


app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})