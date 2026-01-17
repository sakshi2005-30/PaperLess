import SideBar from "./SideBar"
import api from "../services/api";
import {Folder,FolderClosed,FolderOpen} from "lucide-react"
import {useState,useEffect} from "react";
import Navbar from "./Navbar";
const Dashboard = () => {
  const user=localStorage.getItem("user");
  const [documents,setDocuments]=useState(0);
  const [folders,setFolders]=useState(0);

  const [folderList,setFolderList]=useState([]);
  useEffect(()=>{
    const fetchCounts=async()=>{
       try {
         const docs = await api.get("/documents");
         const fol=await api.get("/folders");
         console.log(fol);
         setFolderList(fol.data);
         setDocuments(docs.data.length);
         setFolders(fol.data.length);
       } catch (err) {
        console.log("Error in fetching counts",err);
       }
    }
    fetchCounts();
   
  },[])
  return (
    <div className="h-screen w-full flex bg-gray-100 ">
      <SideBar />

      {/* dashboard content */}
      <div className=" flex flex-col flex-1 ">
        <Navbar />

        {/* main content */}
        <div className="my-12 mx-10">
          <h1 className="text-3xl font-bold">Welcome,{user}!</h1>
          {/* count */}
          <div className="flex my-6 space-x-8 ">
            <div className="flex flex-1 rounded-lg py-6 px-4 space-x-6 items-center bg-linear-to-br from-blue-600 via-blue-300 to-purple-200 ">
              <Folder className="h-15 w-15 text-white font-normal" />
              <div>
                <p className="text-2xl font-medium text-white ">
                  Total Documents
                </p>
                <p className="text-3xl font-bold text-white ">{documents}</p>
              </div>
            </div>

            <div className="flex flex-1 rounded-lg py-6 px-4 space-x-6 items-center bg-linear-to-br from-cyan-600 via-teal-400 to-blue-200 ">
              <FolderClosed className="h-15 w-15 text-white font-normal" />
              <div>
                <p className="text-2xl font-medium text-white ">
                  Total Folders
                </p>
                <p className="text-3xl font-bold text-white ">{folders}</p>
              </div>
            </div>
          </div>
          {/* Quick acces */}
          <div className="flex flex-col">
            <p className="text-xl font-medium">Quick access</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {folderList.length > 0 &&
                folderList.map((item) => (
                  <div
                    key={item._id}
                    className="py-4 px-6 border border-gray-300 shadow-md rounded-lg "
                  >
                    <div className="flex space-x-4 items-center py-4 px-4 bg-linear-to-br from-blue-200  to-purple-50">
                      <FolderOpen className="w-10 h-10 " />
                      <p className="text-xl font-medium">{item.name}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard