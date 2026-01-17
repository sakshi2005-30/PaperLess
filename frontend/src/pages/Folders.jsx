import api from "../services/api"
import Navbar from "./Navbar"
import SideBar from "./SideBar"
import { Plus } from "lucide-react"
import {useState,useEffect,useRef} from "react"
import {FolderOpen,Ellipsis,X} from "lucide-react";
const Folders = () => {
    const [folders,setFolders]=useState([]);
    const [optionId,setOptionsId]=useState(null);
    const [newFolder,setNewFolder]=useState(false);
    const [name,setName]=useState("");
    const ref=useRef(null)
    useEffect(()=>{
        const fetchFolders=async()=>{
            try{
                const res=await api.get("/folders");
                // console.log(res.data);
                setFolders(res.data);

            }
            catch(err){
                console.log("Error in fetching folders",err)
            }
        }
        fetchFolders();

        const handleClickOutside=(e)=>{
            if(ref.current && !ref.current.contains(e.target)){
                setOptionsId(null);
            }
        }
        document.addEventListener("mousedown",handleClickOutside);
        return ()=>{
                document.removeEventListener("mousedown", handleClickOutside);
        }
    },[])
    const handleDelete=async(id)=>{
        try{
            const res=await api.delete(`/folders/${id}`);
            setFolders((prev)=>prev.filter((item)=>item._id!==id));
        }
        catch(err){

        }
    }
    
    const handleCreateFolder=async(e)=>{
        e.preventDefault();
        try{
            const res=await api.post("/folders",{
                name});
                console.log("new folder",res.data);
                setFolders((prev)=>[res.data,...prev]);
                console.log("folders",folders)
                setName("");
                setNewFolder(false);

        }
        catch(err){
            console.log("Error in creating folder",err);
        }
    }
  return (
    <div className="flex bg-gay-100">
      <SideBar />
      <div className="flex flex-col flex-1 ">
        <Navbar />
        {/* add folder */}
        <div className="my-8 mx-18 flex justify-between items-center">
          <p className="text-2xl font-medium">Your Folders</p>
          <div>
            <button
              className="px-6 py-2 bg-purple-600 rounded-lg text-white font-medium flex space-x-2"
              onClick={() => setNewFolder(true)}
            >
              <Plus />
              New Folder
            </button>
            {newFolder && (
              <div className="z-40 fixed inset-0 flex justify-center items-center backdrop-blur-sm bg-black/30 ">
                <div className="bg-white py-10 px-14 rounded-lg shadow-md w-md">
                  <div className="flex justify-between items-center">
                    <p className="text-2xl font-medium text-purple-600">Add new Folder</p>
                    <X onClick={()=>setNewFolder(false)}
                        className="h-8 w-8 p-1 hover:bg-gray-300 hover:rounded-full cursor-pointer"/>
                  </div>

                  <form className="flex flex-col space-y-6 mt-8 mb-4">
                    <input 
                    type="text"
                    placeholder="Enter folder name"
                    name="name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}

                    className="border rounded-lg px-4 py-2 border-gray-300 focus-within:border-2 focus-within:border-purple-600 outline-none"
                     />
                     <button className="px-4 py-2 bg-purple-600 rounded-lg text-white font-medium hover:bg-purple-700 cursor-pointer" onClick={(e)=>handleCreateFolder(e)}>Create</button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
        <hr className="mx-18 text-gray-400" />

        {/* display folders */}
        <div className="mx-18 my-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {folders.length &&
            folders.map((item) => (
              <div
                key={item._id}
                className="py-4 px-4 border rounded-lg border-gray-200 shadow-md"
              >
                <div className="flex justify-between items-center">
                  {" "}
                  <FolderOpen className="w-20 h-20 text-purple-600" />
                  <div className=" relative">
                    <Ellipsis
                      className=" relative text-gray-500 cursor-pointer hover:bg-gray-200 hover:rounded-full h-8 w-8 p-1"
                      onClick={() =>
                        setOptionsId(optionId === item._id ? null : item._id)
                      }
                    />
                    {optionId === item._id && (
                      <button
                        className="absolute px-4 rounded-lg border-gray-300 shadow-lg py-2 border right-0 hover:bg-gray-200 cursor-pointer"
                        onClick={() => handleDelete(item._id)}
                        ref={ref}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-xl font-medium mt-2">{item.name}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Folders