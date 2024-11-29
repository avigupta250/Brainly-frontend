import { useEffect, useState} from "react"
import { apiConnector } from "../../operations/apiconnector";
import { endPoints } from "../../operations/api";



export default function useGetContent(){

const [content,setContent]=useState([]);


useEffect(()=>{
    async function fetchContent() {
        try{
           const response=await apiConnector({
            method:"get",
            url:endPoints.CONTENT,
           headers:{
            token:localStorage.getItem("token")
           }
           })
console.log("response from getConetntt",response)
           setContent(response.data.content);
        }catch(err){

        }
        
    }

    fetchContent();

},[])


return content;

}