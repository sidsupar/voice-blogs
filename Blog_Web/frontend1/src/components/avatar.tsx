import { useMemo } from "react";

export default function Avatar({name, size="small"}: {name: string, size:"small"|"big"}){
    
    const sizeInNum = useMemo(
          () => {
            return size == "small" ? 6: 14;
        }
    ,[size]);  
    console.log("Avatar size = "+sizeInNum)
    return(
        <div className="cursor-pointer">
            <div className={`relative inline-flex items-center justify-center w-${sizeInNum} h-${sizeInNum} bg-gray-100 rounded-full dark:bg-gray-600`}>
                <span className={`${size == "small" ? "text-xs" : "text-md"} text-gray-600 dark:text-gray-300`}>
                    {name[0]}
                </span>
            </div>
        </div>
    )
}