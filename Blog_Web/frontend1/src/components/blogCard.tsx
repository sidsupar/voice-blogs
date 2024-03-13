import { Link } from "react-router-dom"
import Avatar from "./avatar"

interface BlogCardType{
    authorName:string,
    title:string,
    content:string,
    publishedDate:string,
    id:number
}

function Circle(){
    return(
        <>
            <div className="h-1 w-1 rounded-full bg-slate-400">

            </div>
        </>
    )
}

export default function BlogCard({authorName,title,content,publishedDate, id}: BlogCardType){


    return(
        <>
            <div className="border-b border-slate-200 w-screen">
                <div className="flex mt-5">
                    <div className="flex justify-center flex-col pl-2">
                        <Avatar name={authorName} size={"small"}/>
                    </div>
                    <div className="flex justify-center flex-col pl-2">
                        <Circle />
                    </div>
                    <div className="flex justify-center flex-col pl-2 font-bold text-slate-300 text-sm">
                        {authorName} 
                    </div>
                    <div className="flex justify-center flex-col pl-2">
                        <Circle />
                    </div>
                    <div className="flex justify-center flex-col pl-2 font-thin text-slate-300 text-sm">
                        {publishedDate}
                    </div>
                    {/* <div>
                        {publishedDate}
                    </div> */}
                </div>                
                <Link to={"/blog/"+id}>
                    <div className="pl-2 font-extrabold font-serif mt-2 cursor-pointer">                    
                        {title}
                    </div>
                </Link>                
                <div className="p-2 font-serif">
                    {content.substring(0,50)+"..."}
                </div>
                <div className="pl-2 font-extrabold">
                    {Math.ceil(content.length / 100)+" mins"}
                </div>
                {/* <div className="bg-slate-200 h-1 w-full">

                </div> */}
            </div>
        </>
    )
}