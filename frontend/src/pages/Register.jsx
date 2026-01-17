import {Link, useNavigate} from "react-router-dom"
import api from "../services/api"
import {useState} from "react";
const Register = () => {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!name || !email || !password){
      alert("All fileds are required")
    }
    try{
      const res=await api.post("/auth/register",{
        name,email,password
      })
      localStorage.setItem("token",res.data.token);
     
      navigate("/dashboard")
    }
    catch(err){
      console.log("Error in registeration",err);
    }
  }
  return (
    <div className=" min-h-screen flex justify-center items-center bg-gray-100 ">
      <div className="w-105 bg-gray-100/5 border border-gray-300 rounded-lg shadow-md py-8 px-8 ">
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold text-center">Register</h1>

          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Enter Name"
              autoComplete="current-name"
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 w-full py-2 outline-none focus-within:border-purple-600 focus-within:border-2 "
            />
            <input
              type="email"
             name="email"
             value={email}
              placeholder="Enter Email"
              autoComplete="current-email"
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 w-full py-2 outline-none focus-within:border-purple-600 focus-within:border-2 "
            />
            <input
              type="password"

              name="password"
              value={password}
              autoComplete="current-password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 w-full py-2 outline-none focus-within:border-purple-600 focus-within:border-2 "
            />
            <button
              className="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 cursor-pointer"
              type="submit"
            >
              Register
            </button>
          </form>
          <p className="text-center">Already have an account? <Link to="/login" className="text-purple-600 underline">Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register