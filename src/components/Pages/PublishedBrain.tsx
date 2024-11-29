import  { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../../operations/apiconnector'
import { endPoints } from '../../operations/api'
import { Card } from '../Card'
import { useRecoilValue } from 'recoil'
import { contentAtom } from '../../Recoil/store/atoms/content'

const PublishedBrain = () => {

    const content = useRecoilValue(contentAtom);
    const [publicContent,setPublicContent]=useState([]);
    const [user,setUser]=useState()

    const {hash}=useParams()
    console.log("hash from useParams",hash)
   if(!hash)return 
   
    useEffect(()=>{
     async function fetchBrain() {
        if(!hash)return 
        const response=await apiConnector({
            method:"get",
            url:endPoints.LINK.replace(":shareLink",hash),
            params:{
                shareLink:hash
            }
        })

        console.log("Content from Published Brain",response.data.content[0].userId.email)
        setPublicContent(response.data.content)
        setUser(response.data.content[0].userId.email)
        
     }

     fetchBrain()
    },[content])
  return (
    <div className='m-10'>
        {publicContent?.length>0&& <h1 className='text-[20px] font-bold ml-5'>Second Brain of {user}</h1>}
       

    {
         <div className="flex gap-2 p-6 flex-wrap">
         {publicContent?.length > 0 ? (
           publicContent.map(({ type, link, title }, index) => (
             <div key={index}>
               <Card type={type} title={title} link={link} />
             </div>
           ))
         ) : (
          <div className='flex justify-center w-full h-screen items-center'>
            <div className='loader'></div>
          </div>
         )}
       </div>
    }
    </div>
  )
}

export default PublishedBrain

