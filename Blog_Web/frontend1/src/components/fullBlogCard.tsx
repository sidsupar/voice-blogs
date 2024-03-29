// import { Link } from "react-router-dom"
import Avatar from "./avatar"
// import AppBar from "./appBar"

interface BlogCardType{
    authorName?:string,
    title?:string,
    content?:string,
    publishedDate?:string,
    id?:string
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

    if(content == undefined){
        return null
    }
    if(authorName == undefined){
        return null
    }
    console.log(id)
    return(
        <>          
                <div className="border-b border-slate-200 w-4/5">
                    <div className="grid grid-cols-12 mt-5">                        
                        <div className="flex flex-col justify-center col-span-12 md:col-span-8 lg:col-span-8 p-10 bg-white mt-2 mb-2 block border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <div className="pl-2 font-serif mt-2 cursor-pointer text-3xl font-extrabold">                    
                                {title}
                            </div>
                            <div className="pl-2 font-light text-gray-500 text-sm">
                                Posted on {publishedDate?.replace(/[TZ]/ig," ")}
                            </div>
                            <div style={{whiteSpace: 'pre-line'}} className="p-2 font-serif max-w-screen-2xl relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
                                {content}
                            </div>
                            <div className="pl-2 font-extrabold">
                                {Math.ceil(content.length / 100)+" mins"}
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-1 lg:col-span-2">

                        </div>
                        <div className="p-10 w-full h-fit font-serif flex flex-col mt-6 text-gray-700 bg-white mt-2 mb-2 block border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 col-span-12 md:col-span-3 lg:col-span-2">
                            <div className="flex justify-center pl-2 font-bold text-slate-300 text-sm">
                                Author
                            </div>
                            <div className="flex justify-center pl-2 mt-2">
                                <Avatar name={authorName} size={"small"}/>
                                <div className="flex flex-col justify-center pl-2">
                                    <Circle />
                                </div>
                                <div className="flex flex-col justify-center pl-2 font-bold text-slate-300 text-sm">
                                    {authorName} 
                                </div>
                            </div>
                            <div className="flex justify-center flex-col items-center mt-10">
                                <div className="flex justify-center pl-2 font-bold text-slate-300 text-sm">
                                    Published Date
                                </div>
                                <div className="pl-2 text-gray-500 text-sm flex justify-center">
                                    {publishedDate?.replace(/[TZ]/ig," ")}
                                </div>
                            </div>                                                       
                            
                        </div>
                    </div>                
                </div>
            
        </>
    )
}