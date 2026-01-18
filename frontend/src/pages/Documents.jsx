import SideBar from "./SideBar"
import {useState,useEffect,useRef} from "react";
import api from "../services/api";
import Navbar from "./Navbar"
import { Folder } from "lucide-react";
const Documents = () => {
  const [title,setTitle]=useState("");
  const [file,setFile]=useState(null);
  const[documents,setDocuments]=useState([]);
  const [filename,setFilename]=useState("");
  const [folders,setFolders]=useState([]);
  const [selectedFolder,setSelectedFolder]=useState("");
   const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [clickChooseFolder,setClickChooseFolder]=useState(false);
  const [shareLink,setShareLink]=useState("");
  const [shareModalOpen,setShareModalOpen]=useState(false);
  const [copied,setCopied]=useState(false);
  const ref=useRef(null);
  
  const [loading,setLoading]=useState(false);
  
useEffect(()=>{
   const fetchDocs=async()=>{
    setLoading(true);
    try{
      const docs=await api.get("/documents");
     
        setDocuments(docs.data)
      setLoading(false);
      
    }
    catch(err){
       setLoading(false);
      console.log("Error in fetching documents",err);
    }
   }
   const fetchFolders=async()=>{
    try{
      const res=await api.get("/folders");
      setFolders(res.data);
    }
    catch(err){
      console.log("Error in fetching folders",err);
    }
   }
   fetchDocs();
   fetchFolders();

   const handleClickOutside=(e)=>{
    if(ref.current  && !ref.current.contains(e.target)){
      setClickChooseFolder(false);
    }
   
   }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
},[])

const handleSubmit=async(e)=>{
  e.preventDefault();
  if(!title ||!file){
    alert("All fields are required");
    return;
  }
   setLoading(true);
  try{
    const formData=new FormData();
    formData.append("title",title);
    formData.append("file",file)
    formData.append("folderId",selectedFolderId)
    const res=await api.post("/documents/upload",formData)
    setDocuments((prev)=>[res.data,...prev]);

    setTitle("");
    setFile(null);
    setFilename("");
     setLoading(false);
    }
  catch(err){
     setLoading(false);
    console.log("error in uploading file",err);
  }
}
const getDaysAgo=(dateString)=>{
  const updatedDate=new Date(dateString);
  const today=new Date();
  const diff=today-updatedDate;
  const days=(Math.floor(diff/(24*60*60*1000)));
  if(days===0)return "Uploaded Today"
  if(days==1)return "Uploaded 1 day ago"
  return `Uploaded ${days} days ago`;
}
const handleDelete=async(id)=>{
   setLoading(true);
  try{
    // const id=item._id;
    const res=await api.delete(`/documents/${id}`);
    console.log("delete:",res);
    setDocuments((prev)=>prev.filter((doc)=>doc._id !==id));
     setLoading(false);
  }
  catch(err){
     setLoading(false);
     console.log("Error in deleting documents",err);
  }
}
const handleShareLink=async(id)=>{
  try{
   
    const link=await api.post(`/share/${id}`);
    const token=link.data.token;
    const frontendUrl=`${window.location.origin}/share/${token}`
    setShareLink(frontendUrl);
    setShareModalOpen(true);
    console.log("link:",link)
  
  }
  catch(err){
    console.log("Error in sharing link",err);
  }
}
  return (
    <div className="flex bg-gray-100">
      {loading && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 bg-black/30 ">
          <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-lg gap-4">
            <div className="w-12 h-12 border-4 border-purple-600 rounded-full animate-spin border-t-transparent"></div>
            <p className="text-gray-700 font-medium">Please wait</p>
          </div>
        </div>
      )}

      <SideBar />
      <div className="flex flex-col flex-1">
        <Navbar />

        {/* upload document */}
        <div className="mx-6 my-8 ">
          <p className="text-2xl font-bold   mb-2 ">Your Documents</p>
          <hr className="text-gray-400"></hr>
          <p className="text-lg font-medium mt-6">Upload Documents</p>

          <div className="border py-6 px-6 my-4 border-gray-300 rounded-lg bg-white shadow-md">
            <form onSubmit={handleSubmit}>
              <div className="flex space-x-4">
                <input
                  type="text"
                  name="title"
                  value={title}
                  placeholder="Enter title"
                  onChange={(e) => setTitle(e.target.value)}
                  className="px-4 py-2 border flex-1 rounded-lg outline-none border-gray-400 focus-within:border-2 focus-within:border-purple-600   "
                />
                <button
                  className="px-6 py-2  border rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 cursor-pointer"
                  type="submit"
                >
                  Upload
                </button>
              </div>
              <div className="relative">
                <div
                  className="mt-4 px-4 py-2 rounded-lg border border-gray-200 bg-gray-200 font-medium hover:bg-gray-300 cursor-pointer inline-block "
                  onClick={() => setClickChooseFolder(true)}
                >
                  {selectedFolder.length > 0 ? selectedFolder : "Choose Folder"}
                </div>
                {clickChooseFolder && (
                  <div
                    className="absolute bg-white px-4 py-4 rounded-lg border border-gray-300"
                    ref={ref}
                  >
                    <div
                      className="px-2 py-2 border   hover:bg-gray-100 cursor-pointer border-gray-200"
                      onClick={() => {
                        setSelectedFolderId(null);
                        setSelectedFolder("No Folder");
                        setClickChooseFolder(false);
                      }}
                    >
                      No Folder
                    </div>
                    {folders.length &&
                      folders.map((item) => (
                        <div
                          key={item._id}
                          className="px-2 py-2 border   hover:bg-gray-100 cursor-pointer border-gray-200"
                          onClick={() => {
                            setSelectedFolderId(item._id);
                            setSelectedFolder(item.name);
                            setClickChooseFolder(false);
                          }}
                        >
                          {item.name}
                        </div>
                      ))}
                  </div>
                )}
              </div>
              <div className="my-6 ">
                <label
                  htmlFor="fileUpload"
                  className="border px-4 py-2 rounded-lg bg-gray-200 border-gray-300 font-medium cursor-pointer hover:bg-gray-300"
                >
                  Choose Document
                </label>
                <input
                  type="file"
                  name="file"
                  id="fileUpload"
                  onChange={(e) => {
                    const selectedFile = e.target.files[0];
                    if (selectedFile) {
                      setFile(selectedFile);
                      setFilename(selectedFile.name);
                    }
                  }}
                  className="hidden  "
                />
                <span className="ml-2 text-black">{filename}</span>
              </div>
            </form>
          </div>
        </div>

        {/* my file s*/}
        <div className="mx-6  ">
          <p className="text-xl font-semibold mb-4">My Files</p>
          <div className="py-6 px-6 bg-white rounded-lg mb-10">
            {documents.length &&
              documents.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center px-4 py-4 border border-gray-300"
                >
                  <div className="flex space-x-3 items-center">
                    <Folder />
                    <p className="text-lg font-semibold text-black">
                      {item.title}
                    </p>
                  </div>

                  <p className="text-sm text-gray-400">
                    {getDaysAgo(item.updatedAt)}
                  </p>
                  <div className="flex space-x-4 relative">
                    <button
                      className="px-4 py-2 bg-purple-600 cursor-pointer hover:bg-purple-700 text-white font-bold rounded-lg"
                      onClick={() => handleShareLink(item._id)}
                    >
                      Share
                    </button>
                    {shareModalOpen && (
                      <div className="fixed flex justify-center items-center inset-0 bg-black/30 backdrop-blur-sm  ">
                        <div className="bg-white flex flex-col  py-10 px-12 rounded-lg shadow-lg w-lg space-y-4 items-center">
                          <p className="text-xl font-medium text-center">
                            Share document
                          </p>
                          <div className="flex w-full space-x-2">
                            <input
                              type="text"
                              readOnly
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg outline-none focus-within:border-2 focus-within:border-purple-600"
                              value={shareLink}
                            />
                            <div className="relative">
                              <button
                                className="px-4 py-2 rounded-lg border border-purple-600 bg-purple-600 text-white font-medium hover:bg-purple-500 cursor-pointer  text-sm"
                                onClick={() => {
                                  navigator.clipboard.writeText(shareLink);
                                  setCopied(true);
                                  setTimeout(() => setCopied(false), 2000);
                                }}
                              >
                                Copy Link
                              </button>
                              {copied && (
                                <p className="absolute text-center top-10 right-5 font-medium">Copied!</p>
                              )}
                            </div>
                          </div>

                          <button
                            className="px-4 py-2 border border-gray-300 w-20 flex justify-center rounded-lg bg-gray-200 hover:bg-gray-300 font-medium cursor-pointer"
                            onClick={() => setShareModalOpen(false)}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    )}
                    <button
                      className="px-4 py-2 bg-red-500 cursor-pointer hover:bg-red-600 text-white font-bold rounded-lg "
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Documents