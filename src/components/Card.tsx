
// import { ShareIcon } from "./Icons/ShareIcon";

// import { FaShare } from "react-icons/fa";



interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube"
}
export function Card(props: CardProps) {

let videoUrl="";
    if(props.type.toLowerCase()=="youtube"){
        
if(!props.link)return 
const videoId = props.link.split("youtu.be/")[1]?.split("?")[0];
videoUrl=`https://www.youtube.com/embed/${videoId}`;
console.log(videoUrl)
    }

    return <div className="rounded-md  bg-white border-gray-300 p-2 shadow-md max-w-80 ">

     
        <div className="flex justify-between ">
            <div className="flex gap-2 text-md text-gray-500 items-center">
            <div className="h-2 w-2 rounded-full bg-black"></div>
                <p className="text-black font-bold">{props.title}</p>
            </div>
            <div className="flex gap-2 text-gray-500 items-center">
                
                {/* <h1><FaShare/></h1> */}
                <h1>Delete</h1>
            </div>

        </div>
        <div className=" rounded-md pt-3">
            {
                (props.type == "youtube") ? <div>
                    <iframe width="full" height="full" src={videoUrl} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

                </div> : 
                <div className="h-[200px] overflow-y-scroll">
                    <blockquote className="twitter-tweet">
                        <a href={props.link}></a>
                    </blockquote>
                </div>
            }

        </div>

    </div>
}
// props.link.replace("watch","embed").replace("?v=","/")
// https://www.youtube.com/watch?v=yS8k-bWtMWk

