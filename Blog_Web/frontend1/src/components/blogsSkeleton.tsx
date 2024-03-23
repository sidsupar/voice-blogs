import { useEffect, useState } from "react";
import { Circle } from "./blogCard";

export function TextSimultate({size="sm"}: {size:"sm"|"md"|"lg"}){

    const [sizeRec, setSizeRec] = useState(1/4);
    
    useEffect(
        ()=>{
            switch(size){
                case "sm": setSizeRec(1/4); break;
                case "md": setSizeRec(1/2); break;
                case "lg": setSizeRec(4/5); break;
                default : console.log("Invalid size");
            }
        }
    ,[size,])

    return(
        <>
            <div className={`bg-slate-200 py-2 px-10 rounded-lg`}>
                 <div className="bg-slate-300 w-full h-full">

                 </div>
            </div>
        </>
    )

}

export function AvatarSkel({size="small"}: {size:"small"|"big"}){
    const [sizeInNum, setSizeInNum] = useState(6);
    useEffect(
          () => {
            if(size == "big"){
                setSizeInNum(10);            
            }else{
                setSizeInNum(6)
            }            
        }
    ,[sizeInNum]);  
    console.log("Avatar size = "+sizeInNum)
    return(
        <>
            <div className="cursor-pointer">
                <div className={` p-${size == "small" ? 5 : 6} inline-flex items-center justify-center bg-gray-200 rounded-full dark:bg-gray-600`}>
                    <span className={`bg-slate-200 ${size == "small" ? "text-xs" : "text-sm"} text-gray-600 dark:text-gray-300`}>
                        
                    </span>
                </div>
            </div>
        </>
    )
}

export default function BlogsSkeleton(){

    return(
        <>
            <div className="flex justify-center">
                <div className="flex justify-center max-w-xl">
                <div className="border-b border-slate-200 w-screen">
                        <div className="flex mt-5">
                            <div className="flex justify-center flex-col pl-2">
                                <AvatarSkel size="small"/>
                            </div>
                            <div className="flex justify-center flex-col pl-2">
                                <Circle />
                            </div>
                            <div className="flex justify-center flex-col pl-2 font-bold text-slate-300 text-sm">
                                <TextSimultate size="sm" /> 
                            </div>
                            <div className="flex justify-center flex-col pl-2">
                                <Circle />
                            </div>
                            <div className="flex justify-center flex-col pl-2 font-thin text-slate-300 text-sm">
                                <TextSimultate size="md" />
                            </div>
                            {/* <div>
                                {publishedDate}
                            </div> */}
                        </div>                
                        
                            <div className="pl-2 font-extrabold font-serif mt-2 cursor-pointer">                    
                                <TextSimultate size="md" />
                            </div>
                        
                        <div className="p-2 font-serif">
                            <TextSimultate size="lg" />
                        </div>
                        <div className="pl-2 font-extrabold">
                            <TextSimultate size="sm" />
                        </div>
                        {/* <div className="bg-slate-200 h-1 w-full">

                        </div> */}
                        </div>
                    </div>            
                </div>                
        </>
    )

}