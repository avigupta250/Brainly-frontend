
import toast from 'react-hot-toast';
import { FaCopy } from 'react-icons/fa';
import { RxCross2 } from "react-icons/rx";


type ShareModalProps = {
  shareModalOpen: boolean;
  setShareModalOpen: (open: boolean) => void;
  shareUrl:string
  
};

export default function ShareModal({ shareModalOpen, setShareModalOpen,shareUrl}: ShareModalProps) {
  if (!shareModalOpen) return null; // Only render the modal if it's open
   

  
 


  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        toast.success("Link Copied",{duration:3000,position:'top-center',
            style: {
                background: '#363636',
                color: '#fff',
              },
        })
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <>
      <div
        onClick={() => setShareModalOpen(false)} 
        className="fixed inset-0 z-[1000] cursor-pointer grid place-items-center bg-black bg-opacity-50 backdrop-blur-sm"
      >
        <div
          onClick={(e) => e.stopPropagation()} 
          className="bg-white p-4 rounded border border-spacing-1 shadow-lg"
        >
            <div className='transition-all duration-150 flex justify-between  items-center' >
          <h2 className="text-xl font-bold mb-4">Share Brain</h2>
          <span onClick={()=>setShareModalOpen(false)} className=' flex mb-3 hover:text-red-600 text-[25px]'>
           <RxCross2/>
           </span>
           </div>
          <div className="flex items-center justify-between gap-4">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="border rounded p-2 w-full text-gray-700"
            />
            <button
              onClick={handleCopyToClipboard}
              className="px-2 py-2 text-blue-600 text-[30px] hover:text-blue-400 rounded"
            >
             <FaCopy />
            </button>
          </div>
         
        </div>
      </div>
    </>
  );
}
