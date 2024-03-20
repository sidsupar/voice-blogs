import { SetStateAction, useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import axios from "axios";

export const useBlogs = () => {

    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);

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
                setBlogs(["unable", 'to', 'get', 'data', 'from', 'backend']);
            }
        }
        getBlogs();
    },[])

    return [loading, blogs ]
}

export const useBlogById = (id) => {

    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState([]);
    console.log(`useBlogById to search for blog by id =${id}`)
    useEffect(()=>{
        const getBlog = async () =>{
            const getBlogUrl = `${BACKEND_URL}/api/v1/blog/${id}`;
            const blogsRes = await axios.get(getBlogUrl)
            console.log(blogsRes)
            if(blogsRes.status == 200){
                setLoading(false);
                setBlog(blogsRes.data.blogs);
            }else{
                setLoading(false);
                setBlog(["unable", 'to', 'get', 'data', 'from', 'backend']);
            }
        }
        getBlog();
    },[id])

    return [loading, blog ]
}

export const SubmitPost = async (title, textData)=>{
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
    }catch(err: any){
        return {
            submitPostStatus: false,
            data:err.message
        }
    }

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