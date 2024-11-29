import { RxCross2 } from "react-icons/rx";
// import { Button } from "./ui/Button";
import { useState } from "react";
import { apiConnector } from "../operations/apiconnector";
import { endPoints } from "../operations/api";
import toast from "react-hot-toast";

import { Navigate } from "react-router-dom";
// import getContent from "./hooks/getContent";
import { useSetRecoilState } from "recoil";
import { contentAtom } from "../Recoil/store/atoms/content";


interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateContentModal({ open, onClose }: ModalProps) {
    const [title,setTitle]=useState("")
    const [link,setLink]=useState("")
    const [type,setType]=useState("");
    const setContent=useSetRecoilState(contentAtom)
    

    async function submitHandler(){
        
            try{
                // console.log("hjfjg")
                const response=await apiConnector({
                    method:"post",
                    url:endPoints.CONTENT,
                    bodyData:{
                        title,
                        link,
                        type
                    },
                    headers:{
                        token:localStorage.getItem("token")
                    }
    
                 })
                   setContent(response.data.userContent)
                 toast.success("Brain Added",{duration:3000,position:'top-center',
                    style: {
                        background: '#363636',
                        color: '#fff',
                      },
                })
               
                onClose()

                
                //  console.log("conetnt creation ",response.data.userContent)
                 return <Navigate to="/dashboard"></Navigate>
            }catch(err){
                  //  console.log("error from content creation ",err)
            }
    }
  return (
    <div>
    {open && (
      <div
        className="fixed inset-0 z-[1000] cursor-pointer grid place-items-center overflow-auto bg-opacity-90 backdrop-blur-sm  transition-all duration-300"
        onClick={onClose}
      >
        <div
          className="z-10 flex flex-col cursor-not-allowed justify-center bg-blue-300 opacity-100 p-4 rounded transform scale-90 transition-transform duration-300 ease-out"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            onClick={onClose}
            className="flex text-[30px] cursor-pointer justify-end text-red-500"
          >
            <RxCross2 />
          </div>
          <div className="flex">
            <form
              onSubmit={(e) => {
                e.preventDefault(); // Prevent default form submission
                submitHandler();
              }}
              className="flex flex-col justify-center items-center"
            >
              <div className="flex flex-col">
                <input
                  type="text"
                  value={title}
                  placeholder="Title"
                  onChange={(e) => setTitle(e.target.value)}
                  className="mb-2 p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="mb-2 p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="youtube or twitter"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="mb-2 p-2 border rounded"
                />
              </div>
              <button
                type="submit" // Use type="submit" for better semantics
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    )}
  </div>
  
  );
}
