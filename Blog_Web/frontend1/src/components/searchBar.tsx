import { useEffect, useState } from "react";
import { useSearchBlogs } from "../hooks";
import { Link } from "react-router-dom";
import { useLocation } from "react-router"

function useDebouncedInput(input: string){
    const [inputTyped, setInputTyped] = useState("")
    useEffect(
        () =>{
            const st = setTimeout(()=>{
                setInputTyped(input)
            },500)

            return ()=>{
                clearTimeout(st)
            }
        }
    ,[input])

    return inputTyped
}

export function SearchBar(){
    console.log("SearchBar")
    const [input, setInput] = useState("");
    const debouncedInput = useDebouncedInput(input)
    const [loading, blogs, number_of_blogs] = useSearchBlogs(debouncedInput);
    const location = useLocation();
    console.log(loading)
    // if(loading){
    //     return(
    //         <>
    //             Loading...
    //         </>
    //     )
    // }
    function handleInput(e: React.SyntheticEvent){
        const tgt = e.target as HTMLInputElement;
        console.log(`inside search blog searchbar tgt = ${tgt.value}`)
        setInput(tgt.value)
    }

    return(
        <>
            <div className="flex flex-col items-center p-2">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input onInput={handleInput} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="blogs" required />
                    <div>
                        {input == "" ? 
                            <div className="cursor-pointer text-white absolute end-2.5 bottom-2.5 bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-200  dark:focus:ring-gray-300">
                                Search
                            </div> :
                            <div className="cursor-pointer text-white absolute end-2.5 bottom-2.5 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                                <Link to="/paginatedSearch" state={{location, keyword:debouncedInput, number_of_blogs: number_of_blogs}}>
                                    Search
                                </Link>
                            </div>
                            
                        }
                    </div>
                </div>
                <div className="flex flex-col items-center relative w-full">
                    {input!="" && blogs?.length  > 0 ? <BlogsSearchScreen blogs={blogs}/> : null}                    
                </div>
            </div>
            
        </>
    )
}

function BlogsSearchScreen({blogs}: {blogs:BlogShort[]}){

    return(
        <div className={`absolute w-full z-20 transition-opacity ease-in duration-700 shadow-lg`}>
            <div className="w-full z-10 p-5 relative justify-center items-center font-serif max-w-screen-2xl relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full">
                <div className="w-full">
                    {
                        blogs.map((blog)=>{
                                    return (
                                            <>
                                                <div className="flex justify-between border-b mt-2 text-sm" key={blog.id}>
                                                    <div>
                                                        <Link to={"/blog/"+blog.id}>
                                                            {blog.title}
                                                        </Link>
                                                    </div>
                                                    <div>
                                                        {blog?.publishDate?.replace(/[TZ]/ig," ")}
                                                    </div>
                                                </div>
                                            </>
                                    )
                        })
                    }
                    </div>                
            </div>
        </div>
        
    )

}

interface BlogShort{
    id: number;
    author: {
        name: string;
    };
    title: string;
    content: string;
    publishDate: string;
    number_of_blogs:string
}