import {useParams } from "react-router";
import FullBlogCard from "../components/fullBlogCard";
import { useBlogById } from "../hooks";
import AppBar from "../components/appBar";
import FullBlogSkel from "../components/fullBlogSkel";

interface BlogById {
    id?: string;
    author?: {
        name?: string;
    };
    content?: string;
    title?: string;
    publishDate?: string;
}

export default function Blog() {
    console.log("-----------------1--------------------")
    const queryParams = useParams();
    const id = queryParams["id"];
    console.log("Id for blog to search = " + id)
    const [loading, blogByid] = useBlogById(id);

    if (loading) {
        return (
            <>
                <FullBlogSkel />
            </>
        )
    }
    console.log("-----------------2--------------------")
    console.log(blogByid)
    console.log("-----------------3--------------------")
    // if(isBlogById(blogByid)) {
        return (
            <>
                <AppBar />
                <div className="flex justify-center absolute z-10">
                    <div className="flex justify-center">
                        {isBlogById(blogByid) ? <FullBlogCard
                            authorName={blogByid.author?.name || "anonymous"}
                            content={blogByid.content}
                            title={blogByid.title}
                            publishedDate={blogByid.publishDate || "mm/dd/yyyy"}
                            id={blogByid.id}
                        /> : null
                        }
                    </div>
                </div>
            </>
        )
    // }
    console.log("-----------------4--------------------")
    
}

// Type guard to check if the object is of type BlogById
const isBlogById = (obj: any): obj is BlogById => {
    return typeof obj === 'object' && obj !== null &&
        typeof obj.id === 'string';
};