import { Link ,useNavigate} from "react-router-dom";
import api from "../services/api";
import { useState } from "react";

const Login = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!email || !password){
      alert("All fields are required");
      return;
    }
    try{
      const res=await api.post("/auth/login",{
        email,
        password
      });
    
      localStorage.setItem("token",res.data.token);
        console.log(res);
        console.log("token:", localStorage.getItem("token"));
        localStorage.setItem("user",res.data.user.name);
        console.log("User:",localStorage.getItem("user"))
      navigate("/dashboard");

    }
    catch(err){
      console.log("Error",err);
    }

  }
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-105 bg-ray-100/5 border border-gray-300 rounded-lg shadow-md ">
        <div className="flex flex-col  space-y-4 my-8 mx-6">
          <div className="flex flex-col space-y-1 ml-1">
            <h1 className="text-3xl  font-bold ">Welcome Back,</h1>
            <p className="text-purple-600">Login to your account</p>
          </div>

          <form className="flex flex-col space-y-4 " onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="current-email"
              className="border border-gray-300 rounded-lg px-4 w-full py-2 outline-none focus-within:border-purple-600 focus-within:border-2 "
            />
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="border border-gray-300 rounded-lg px-4 w-full py-2 outline-none focus-within:border-purple-600 focus-within:border-2 "
            />
            <button
              className="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 cursor-pointer"
              type="submit"
            >
              Login
            </button>
          </form>
          <p className="text-center">
            Don't have an account?
            <Link to="/register" className="text-purple-600 underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

