import AppBar from "../components/appBar";
import BlogCard from "../components/blogCard";
import BlogsSkeleton from "../components/blogsSkeleton";
import { useBlogs } from "../hooks";

interface Blog {
    id: number;
    author: {
        name: string;
    };
    title: string;
    content: string;
    publishDate: string;
}

export default function Blogs(){

    const [loading, blogs] = useBlogs();

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
            <div>
                {blogs?.map((blog: Blog, index: number) => {
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
        </>
    )
}