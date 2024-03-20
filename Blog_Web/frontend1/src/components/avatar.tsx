import { useEffect, useMemo, useState } from "react";
import { AvatarDetails } from "./avatarDetails";

export default function Avatar({name, size="small"}: {name: string, size:"small"|"big"}){
    const [sizeInNum, setSizeInNum] = useState(6);
    useEffect(
          () => {
            if(size == "big"){
                setSizeInNum(10);            
            }else{
                setSizeInNum(6)
            }            
        }
    ,[]);  
    console.log("Avatar size = "+sizeInNum)
    return(
        <>
            <div className="cursor-pointer">
                <div className={`w-${sizeInNum} h-${sizeInNum} inline-flex items-center justify-center bg-gray-100 rounded-full dark:bg-gray-600`}>
                    <span className={`${size == "small" ? "text-xs" : "text-sm"} text-gray-600 dark:text-gray-300`}>
                        {name[0]}
                    </span>
                </div>
            </div>
        </>
    )
}