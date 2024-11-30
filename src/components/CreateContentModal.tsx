import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { apiConnector } from "../operations/apiconnector";
import { endPoints } from "../operations/api";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { contentAtom } from "../Recoil/store/atoms/content";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateContentModal({ open, onClose }: ModalProps) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [type, setType] = useState("YouTube"); // Default type is YouTube
  const setContent = useSetRecoilState(contentAtom);

  const contentTypes = ["YouTube", "Twitter"]; // Content type options

  async function submitHandler() {
    try {
      const response = await apiConnector({
        method: "post",
        url: endPoints.CONTENT,
        bodyData: {
          title,
          link,
          type: type.toLowerCase(), // Convert type to lowercase for backend
        },
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setContent(response.data.userContent);
      toast.success("Content Added", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#363636",
          color: "#fff",
        },
      });
      onClose();
      return <Navigate to="/dashboard"></Navigate>;
    } catch (err) {
      console.error("Error creating content:", err);
    }
  }

  return (
    <div>
      {open && (
        <div
          className="fixed inset-0 z-[1000] grid place-items-center overflow-auto bg-opacity-90 backdrop-blur-sm transition-all duration-300"
          onClick={onClose}
        >
          <div
            className="z-10 flex flex-col justify-center bg-black p-4 rounded transform scale-90 transition-transform duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              onClick={onClose}
              className="flex text-[30px] cursor-pointer justify-end text-red-500"
            >
              <RxCross2 />
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitHandler();
              }}
              className="flex flex-col justify-center items-center"
            >
              {/* Title Input */}
              <input
                type="text"
                value={title}
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                className="mb-4 p-2 border rounded w-full"
              />

              {/* Link Input */}
              <input
                type="text"
                placeholder="Link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="mb-4 p-2 border rounded w-full"
              />

              {/* Content Type Selector */}
              <div className="flex gap-4 mb-4">
                {contentTypes.map((contentType) => (
                  <button
                    key={contentType}
                    type="button"
                    className={`px-4 py-2 rounded-md text-white transition-all duration-200 ${
                      type === contentType
                        ? "bg-blue-600"
                        : "bg-gray-400 hover:bg-gray-500"
                    }`}
                    onClick={() => setType(contentType)}
                  >
                    {contentType}
                  </button>
                ))}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
