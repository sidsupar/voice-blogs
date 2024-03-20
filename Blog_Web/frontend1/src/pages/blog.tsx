import { useLoaderData, useParams } from "react-router";
import FullBlogCard from "../components/fullBlogCard";
import { useBlogById } from "../hooks";
import AppBar from "../components/appBar";

export default function Blog(){
    const queryParams = useParams();
    const id = queryParams["id"];
    console.log("Id for blog to search = "+id)
    const [loading, blogByid] = useBlogById(id);

    if(loading){
        return (
            <>
                Loading...
            </>
        )
    }
    console.log(`${blogByid.id} published on ${blogByid.publishDate}`)
    return(
        <>
            <AppBar />
            <div className="flex justify-center absolute z-10">
                <div className="flex justify-center">
                    <FullBlogCard authorName={blogByid.author.name == null ? "anonymous" : blogByid.author.name}
                              content={blogByid.content}
                              title={blogByid.title}
                              publishedDate={blogByid.publishDate ? blogByid.publishDate : "mm/dd/yyyy"}
                              id={blogByid.id}
                    />
                </div>
            </div>
        </>
        
    )
}