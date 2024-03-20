import AppBar from "../components/appBar";
import BlogCard from "../components/blogCard";
import { useBlogs } from "../hooks";

export default function Blogs(){

    const [loading, blogs] = useBlogs();

    if(loading){
        return (
            <>
                Loading...
            </>
        )
    }

    return(
        <>
            <AppBar />
            <div>
                {blogs.map((blog, index) => {
                    console.log(`${blog.id} published on ${blog.publishDate}`)
                    return (
                        <>
                            <div key={index} className="flex justify-center">
                                <div key={index + 1} className="flex justify-center max-w-xl">
                                    <BlogCard key={index + 2} authorName={blog.author.name == null ? "anonymous" : blog.author.name}
                                        content={blog.content}
                                        title={blog.title}
                                        publishedDate={blog.publishDate ? blog.publishDate : "mm/dd/yyyy"}
                                        id={blog.id}
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