import { createBlogInput, CreateBlogType } from "@sidsupar/medium-commons";

export default async function BlogInputValidation(c: any, next: any){

    const body: CreateBlogType = await c.req.json();
    console.log(body)
    try{    
        const blogBody = createBlogInput.safeParse(body);
        console.log(blogBody)
        if(blogBody.success == true){
            await next()
        }else{
            throw new Error("Invalid input for blog")
        }
    }catch(err: any){
        c.status(407);
        return c.json({
            msg:"Invalid input for blog",
            err:err.message
        })
    }

}