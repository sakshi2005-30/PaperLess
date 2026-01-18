import { useParams } from "react-router-dom"
import {useState,useEffect} from "react";
import publicApi from "../services/publicApi";
import { Download } from "lucide-react";
const ShareView = () => {
    console.log("ShareView")
    const {token}=useParams()
    const [doc,setDoc]=useState(null);
    console.log("doc:",doc)
    useEffect(()=>{
        const fetchDoc=async()=>{
            try{
                const res=await publicApi.get(`/share/${token}`);
                setDoc(res.data);
                console.log(res);
            }
            catch(err){
                console.log("Error in fetching share doc")
            }
        }
        fetchDoc();
    },[token])
    if(!doc){
        return <p>Loading shared Document</p>
    }
  return (
    <div>
      <div className="flex flex-col justify-center my-10 mx-8 space-y-8 items-center">
        <p className="text-3xl font-bold ">Shared Document</p>

        <div className="">
          <div className="flex">
            {doc.fileType.startsWith("image") ? (
              <div className="flex flex-col justify-center items-center space-y-2">
                {" "}
                <img
                  src={`${doc.fileUrl}`}
                  alt="image"
                  className="w-100 h-100 py-4 px-4 border 
            rounded-lg border-gray-300 shadow-md "
                />
                <a
                  href={doc.fileUrl.replace(
                    "/upload/",
                    "/upload/fl_attachment/",
                  )}
                  download
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 "
                >
                  Download Image
                </a>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center space-y-2">
                <iframe
                  src={`${doc.fileUrl}`}
                  title="PDF preview"
                  className="w-120 h-120"
                />
                <a
                  href={`${doc.fileUrl}`}
                  download
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg cursor-pointer  font-medium hover:bg-purple-500"
                >
                  Download
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareView