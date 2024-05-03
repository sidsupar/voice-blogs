import { useEffect, useState } from "react"
// import { BACKEND_URL } from "../config";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
console.log(`backend url: ${BACKEND_URL}`);
interface Blog {
    id: number;
    author: {
        name: string;
    };
    title: string;
    content: string;
    publishDate: string;
}


export const useBlogs = (): [boolean ,Blog[]] => {

    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(()=>{
        const getBlogs = async () =>{
            const getBlogsUrl = `${BACKEND_URL}/api/v1/blog/bulk`;
            const blogsRes = await axios.get(getBlogsUrl)
            console.log(blogsRes)
            if(blogsRes.status == 200){
                setLoading(false);
                setBlogs(blogsRes.data.blogs);
            }else{
                setLoading(false);
                setBlogs([]);
            }
        }
        getBlogs();
    },[])

    return [loading, blogs]
}

type BlogById = {
    content?:string,
    title?:string,
    publishDate?:string,
    id?:string,
    author?:{
        name: string
    }
}

export const useBlogById = (id?: string): [boolean, BlogById] => {
    const [loading, setLoading] = useState<boolean>(true);
    const [blog, setBlog] = useState<BlogById>({});
    console.log(`useBlogById to search for blog by id = ${id}`)

    useEffect(() => {
        const getBlog = async () => {
            // if (!id) return; // Exit early if id is undefined or null

            const getBlogUrl = `${BACKEND_URL}/api/v1/blog/blogs/${id}`;
            try {
                const blogsRes = await axios.get(getBlogUrl)
                console.log(blogsRes)
                if (blogsRes.status === 200) {
                    setLoading(false);
                    setBlog(blogsRes.data.blogs);
                } else {
                    setLoading(false);
                    setBlog({});
                }
            } catch (error) {
                setLoading(false);
                console.error("Error fetching blog:", error);
                setBlog({});
            }
        }
        getBlog();
    }, [id])

    return [loading, blog]
}

export const SubmitPost = async (title: string, textData: string) : Promise<{ submitPostStatus?: boolean, data?: object | string }> =>{
    // console.log(`date is ${Date_toYMD(new Date(Date.now()))}`)
    try{
        const res = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
            title:title,
            content:textData,
        })

        if(res.status == 200){
            return{
                submitPostStatus: true,
                data:res.data
            }
        }else{
            throw new Error("Not able to create blog")
        }
    }catch(err: unknown){
        if(err instanceof Error)
            return {
                submitPostStatus: false,
                data:err.message
            }
    }

    return ( 
        {
            submitPostStatus: false,
            data:"Something went wrong"
        }
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
export function useSearchBlogs(searchWord:string, pageNumber:number=1): [loading:boolean, blogs:BlogShort[], number_of_blogs:number]{
    const [loading, setLoading] = useState<boolean>(true);
    const [blogs, setBlogs] = useState<BlogShort[]>([]);
    const [blogsCount, setBlogsCount] = useState(0)
    console.log(`loading =${loading}`);
    console.log(`blogs = `);
    console.log(blogs);
    useEffect(
        ()=>{
                try{
                    async function getBlogs(){
                        if(searchWord != ""){
                            const res = await axios.post(`${BACKEND_URL}/api/v1/blog/bulksearch`,{
                                searchKeyword:searchWord,
                                skip:pageNumber - 1,
                                take:5
                            })
                            if(res.status == 411){
                                setLoading(true);
                                setBlogs([]);
                                throw new Error("Not able to search blogs paginately"); 
                            }
                            if(res.status != 200){
                                setLoading(true);
                                setBlogs([])                            
                                throw new Error("Not able to search blogs paginately")
                            }
                            setLoading(false);
                            console.log(res.data)
                            setBlogs(res.data.blogs)
                            setBlogsCount(res.data.number_of_Blogs)
                        }
                        else{
                            setLoading(true);
                            setBlogs([]);
                            setBlogsCount(0);
                            throw new Error("Empty input")
                        }
                    }
                    getBlogs();
                }
                catch(err: any){
                        console.log(`Error in fetching blogs paginatey :${err?.message}`)
                }          
        },[searchWord, pageNumber]
    )
    return [
        loading,
        blogs,
        blogsCount
    ]
}

// function Date_toYMD(date) {
//     let year, month, day;
//     year = String(date.getFullYear());
//     month = String(date.getMonth() + 1);
//     if (month.length == 1) {
//         month = "0" + month;
//     }
//     day = String(date.getDate());
//     if (day.length == 1) {
//         day = "0" + day;
//     }
//     return year + "-" + month + "-" + day;
// }

