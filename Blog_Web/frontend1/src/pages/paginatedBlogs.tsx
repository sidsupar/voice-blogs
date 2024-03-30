import { useLocation, useNavigate } from "react-router"
import { useSearchBlogs } from "../hooks";
import { useEffect, useMemo, useState } from "react";
import BlogCard from "../components/blogCard";
import AppBar from "../components/appBar";
import BlogsSkeleton from "../components/blogsSkeleton";

interface BlogShort{
    id: number;
    author: {
        name: string;
    };
    title: string;
    content: string;
    publishDate: string;
}

export default function PaginatedBlogs(){

    const [page, setPage] = useState(1);
    const  location = useLocation();
    console.log("Location---------------------------")
    console.log(location)
    const keyword = location?.state?.keyword;
    const [loading, blogs, number_of_blogs] = useSearchBlogs(keyword, page);
    const navigate = useNavigate();

    if(keyword == ""){
        navigate(location?.state?.location?.pathname)
    }

    if(loading){
        return (
            <>
                <AppBar />
                <BlogsSkeleton />
                <BlogsSkeleton />
                <BlogsSkeleton />
                <BlogsSkeleton />
                <BlogsSkeleton />
                <BlogsSkeleton />
                <BlogsSkeleton />
                <BlogsSkeleton />
            </>
        )
    }


    return(
        <>
        <AppBar />
        <div className="flex justify-center">
            <div className="w-fit mb-2 mt-2 block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="flex flex-col items-center justify-center">
                    
                    {/* <div className="font-serif text-md font-extrabold">
                        Page {Math.ceil(page/5)}
                    </div> */}
                    
                    <div>
                        {blogs?.map((blog: BlogShort, index: number) => {
                            console.log(`${blog?.id} published on ${blog.publishDate}`)
                            return (
                                <>
                                    <div key={index} className="flex justify-center">
                                        <div key={index + 1} className="flex justify-center max-w-xl">
                                            <BlogCard key={index + 2} authorName={blog?.author.name == null ? "anonymous" : blog?.author.name}
                                                content={blog?.content}
                                                title={blog?.title}
                                                publishedDate={blog?.publishDate ? blog?.publishDate : "mm/dd/yyyy"}
                                                id={blog?.id}
                                            />
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                    <div className="flex flex-col justify-center">
                        {/* <div>
                            Paginated Blogs: {location?.state?.keyword} :: {location?.state?.number_of_blogs}
                        </div> */}
                        <div className="w-full justify-center mt-5 font-serif font-bold">
                            <PageNumbers blogsCount = {number_of_blogs} setPage={setPage} page= {Math.floor(page/5)+1}/>
                        </div>
                        {/* <div className="mt-5 font-extrabold font-serif text-2xl">
                            <SelectPage page={page} setPage={setPage}/>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
        </>
        
    )
}

function PageNumbers({blogsCount, setPage, page}: {blogsCount: number, setPage:React.Dispatch<React.SetStateAction<number>>, page:number}){

    const elements = useMemo(()=>{
        const elements: number[] = [];
        for(let i=0; i<Math.ceil(blogsCount / 5); i++){
            console.log("Hi from elements loop")
            elements.push(
                    i*5 + 1
            )  
        }
        return elements
    }, [blogsCount]);  

    return(
        <>
            <div className="flex justify-between">
                {
                    elements.map((number, index) => <>
                                                        <div onClick = {()=>setPage(number)} className={`${page == Math.ceil(number/5) ? "text-green-700 border border-b-black" : "text-red-700"} mx-2 cursor-pointer`} key={index}>
                                                            {Math.ceil(number/5)}
                                                        </div>
                                                    </>
                                                    
                    )
                }
            </div>
        </>
    )
}

// function SelectPage({page, setPage}:{page:number, setPage:React.Dispatch<React.SetStateAction<number>>}){

//     useEffect(()=>{
//         if(page < 1){
//             setPage(1)
//         }
//     },[page])

//     return(
//         <>
//             <div className="flex justify-center">
//                 <div onClick = {()=>setPage((val) => val - 5)} className="mx-2 cursor-pointer">
//                     {"<"}
//                 </div>
//                 <div onClick = {()=>setPage((val) => val + 5)} className="mx-2 cursor-pointer">
//                     {">"}
//                 </div>                
//             </div>
//         </>
//     )
// }
