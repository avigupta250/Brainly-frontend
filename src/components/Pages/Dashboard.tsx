
import { Button } from '../ui/Button'

import { Card } from '../Card'
import { CreateContentModal } from '../CreateContentModal'
import { useEffect, useState } from 'react'
import { SideBar } from '../Sidebar'
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'

import { useRecoilValue, useSetRecoilState } from 'recoil'
import { allContentAtom, contentAtom } from '../../Recoil/store/atoms/content'
import useGetContent from '../hooks/useGetContent'
import ShareModal from '../ShareModal'
import { apiConnector } from '../../operations/apiconnector'
import { endPoints } from '../../operations/api'
import { FaBrain, FaPlus, FaShare } from 'react-icons/fa'
import UnPublishBrain from '../UnPublishBrain'
import toast from 'react-hot-toast'

function DashBoard() {

  const [modalOpen, setModalOpen] = useState(false)
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const navigate = useNavigate();


  const setAllContent = useSetRecoilState(allContentAtom);
  const setContent = useSetRecoilState(contentAtom);
  const allContent = useGetContent();
  const content = useRecoilValue(contentAtom)

  useEffect(() => {
    if (allContent) {
      setAllContent(allContent);
      setContent(allContent);
    }
  }, [allContent, setAllContent, setContent]);

  const [shareUrl, setShareUrl] = useState("");


  async function ShareHandler() {
    try {
      const response = await apiConnector({
        method: "post",
        url: endPoints.SHARE,
        headers: {
          token: localStorage.getItem("token")
        },
        bodyData: {
          share: true
        }


      })
      console.log(response.data.hash)
      const hash = response?.data?.hash;
      if (hash) {
        const baseUrl = "http://localhost:5173/share";
        setShareUrl(`${baseUrl}/${hash}`);
        console.log("Updated Share URL:", `${baseUrl}/${hash}`);
        toast.success("Brain Published", {
          duration: 3000, position: 'top-center',
          style: {
            background: '#363636',
            color: '#fff',
          },
        })
      }




    } catch (err) {

    }
  }

  return (
    <div>
      
    <div className=' h-screen'>
      <div className='h-screen pl-4 pt-4   bg-white border-r pr-4 w-0 md:w-72 fixed left-0 top-0 transition-all duration-500   md:block  hidden'>
      <div className="font-bold mb-4 hidden md:block  text-2xl">
       <span className='flex  items-center gap-3 '>
       <p><FaBrain/></p>
       <h1> Brainly</h1>
       </span>
      </div>
        <SideBar />
      </div>

      <div className='p-2  ml-0  md:ml-72 '>

        <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)}></CreateContentModal>

        <div>
          <ShareModal shareModalOpen={shareModalOpen} shareUrl={shareUrl} setShareModalOpen={setShareModalOpen}></ShareModal>

        </div>
        <div className="flex h-16  justify-between md:justify-end gap-4 sticky items-center bg-white top-0 ">
          <div className='ml-3 text-blue-600 text-[30px] md:hidden '><FaBrain /></div>
          <div className='flex gap-3  items-center'>
          <UnPublishBrain shareUrl={shareUrl} />
          <Button variant="primary" text="Add Content" startIcon={<FaPlus />} onClick={() => setModalOpen(true)} size={"md"} ></Button>
          <Button variant="secondary" text="Share brain" startIcon={<FaShare />} size={"md"} onClick={() => {
            ShareHandler()
            setShareModalOpen(true)
          }} ></Button>
          {
            localStorage.getItem("token") &&
            <button className='text-[30px] hover:text-red-700' onClick={() => {
              localStorage.removeItem("token")
              navigate("/")

            }}><IoLogOutOutline /></button>
          }
        </div>
        </div>


        <div className="flex w-full justify-center items-center gap-2  flex-wrap">
          {content?.length > 0 ? (
            content.map(({ type, link, title }, index) => (
              <div key={index} className=''>
                <Card type={type} title={title} link={link} />
              </div>
            ))
          ) : (
            <p>No content available.</p>
          )}
        </div>
       


      </div>
    </div>
    
    <div className='w-full  flex justify-evenly items-center   bg-blue-200 mb-0 md:hidden bottom-0 fixed rounded-lg'>
          <SideBar />
         
        </div>
    </div>
  )
}

export default DashBoard



// https://youtu.be/Oo3qsxihXqY?si=uSIkWf5iUbybI6Yr
// https://youtu.be/as1vXNoTzU4?si=ETlV0ekXM9R-VEMI