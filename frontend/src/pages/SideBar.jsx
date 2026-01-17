import {useState,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";

const SideBar = () => {
    const menu=[
        {name:"Dashboard",path:"/dashboard"},
        {name:"Documents",path:"/documents"},
        {name:"Folders",path:"/folders"}
    ]
   const user=localStorage.getItem("user");
    const [name,setName]=useState("");
    const navigate=useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem("token");
        navigate("/login");
    }
  return (
    <div className="h-screen   flex overflow-x-hidden">
      <div className="w-60  h-full border border-gray-300  flex flex-col shadow-md ">
        <h1 className="text-xl  font-bold py-4 border-b border-gray-300 shadow-sm w-full text-center">
          PaperLess
        </h1>

        <div className="flex flex-col my-10 space-y-2 w-full ">
          {menu.map((item) => (
           
              <Link
                to={item.path}
                key={item.path}
                className="text-gray-500 font-medium  hover:bg-purple-100 px-4 py-3  flex justify-start mx-6 cursor-pointer "
              >
                {item.name}
              </Link>
            
          ))}
          <div
            className="text-gray-500 font-medium  hover:bg-purple-100 px-4 py-3  flex justify-start mx-6 cursor-pointer "
            onClick={handleLogout}
          >
            <button>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar