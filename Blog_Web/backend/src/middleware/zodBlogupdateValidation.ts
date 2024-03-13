import { updateBlogInput, UpdateBlogType } from "@sidsupar/medium-commons";

export default async function BlogInputUpdateValidation(c: any, next: any){

    const body: UpdateBlogType = await c.req.json();
    console.log(body)
    try{    

        const blogBody = updateBlogInput.safeParse(body);
        console.log(blogBody)
        if(blogBody.success == true){
            await next()
        }else{
            throw new Error("Invalid input for blog update")
        }
    }catch(err: any){
        c.status(407);
        return c.json({
            msg:"Invalid input for blog update",
            err:err.message
        })
    }

}