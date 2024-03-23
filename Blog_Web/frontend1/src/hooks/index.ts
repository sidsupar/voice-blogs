import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import axios from "axios";

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

            const getBlogUrl = `${BACKEND_URL}/api/v1/blog/${id}`;
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

