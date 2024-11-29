
import { ShareIcon } from "./Icons/ShareIcon";



interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube"
}
export function Card(props: CardProps) {


    return <div className="rounded-md  bg-white border-gray-300 p-2 shadow-md max-w-80 ">

     
        <div className="flex justify-between ">
            <div className="flex gap-2 text-md text-gray-500 items-center">
                <ShareIcon size="md"></ShareIcon>
                <p className="text-black font-bold">{props.title}</p>
            </div>
            <div className="flex gap-2 text-gray-500 items-center">
                <ShareIcon size="md"></ShareIcon>
                <h1>Delete</h1>
            </div>

        </div>
        <div className=" rounded-md pt-3">
            {
                (props.type == "youtube") ? <div>
                    <iframe width="full" height="full" src={props.link.replace("watch","embed").replace("?v=","/")} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

                </div> : 
                <div className="h-[200px] overflow-y-scroll">
                    {/* <blockquote className="twitter-tweet">
                        <a href={props.link}></a>
                    </blockquote> */}
                </div>
            }

        </div>

    </div>
}
