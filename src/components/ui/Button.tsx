import { ReactElement } from "react";
import { FaShare } from "react-icons/fa";

interface ButtonProps{
    variant :"primary" |"secondary";
    size:"sm"|"md"|"lg";
    text:string;
    startIcon?:ReactElement;
    endIcon?:ReactElement;
    padding?:string
    onClick?: () => void;
}
const variantStyles={
    "primary":"bg-purple-500 text-white",
    "secondary":"bg-blue-200 text-purple-600"
}
const sizeStyles={
    "sm":"py-1 px-1 text-sm rounded-sm ",
    "md":"py-2 px-4 text-md rounded-md",
    "lg":"py-4 px-6 text-lg rounded-lg"
}
const defaultStyles=" gap-2 justify-center items-center  flex "


export const Button=(props:ButtonProps)=>{

    return <button onClick={props.onClick} className= {`${variantStyles[props.variant]  } ${sizeStyles[props.size]}  flex justify-center  items-center   `}>
        <div className={`${defaultStyles}` }>
       {props.startIcon?<div className="">{props.startIcon}</div>:null}
      <div className="hidden md:block  "> {props.text}{props.endIcon}</div>
       </div>
        </button>
}