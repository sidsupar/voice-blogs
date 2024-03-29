import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { jwt, sign, verify } from 'hono/jwt';
import BlogInputValidation from "../middleware/zodBlogCreate"
import BlogInputUpdateValidation from "../middleware/zodBlogupdateValidation"

const app = new Hono<{
    Bindings:{
      DATABASE_URL:string,
      JWT_SECRET:string,
    },
    Variables:{
        userId:string,
    }
  }>();

  app.use(async (c, next) =>{
    //Extract userId and pass it down to next
        try{
            const token:string = c.req.header("authorization")?.split(" ")[1] || "";
            console.log(token);
            const user = await verify(token, c.env.JWT_SECRET);
            if(user){
                c.set("userId", user.id);
                await next()
            }else{
                return c.json({
                    msg:"Error occured, no token provided"
                })
            }
        }catch(err: any){
            c.status(403)
            return c.json({
                msg:"Error occured, JWT Verification failed",
                err:err.message
            })
        }

  });

  app.post("/", BlogInputValidation,async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const userId = c.get("userId")
    type blogBodyType = {
        title:string,
        content:string,
        authorId:number,
        publishedDate: Date
    }
    const blogBody:blogBodyType= await c.req.json();
    try{

        const res = await prisma.blog.create({
            data:{
                title: blogBody.title,
                content: blogBody.content,
                authorId: parseInt(userId),
                publishDate: new Date(Date.now())
            }
        });

        if(!res){
            throw new Error(
                "Error creating blog post, not able to reach DB"
            )
        }

        c.status(200);
        return (c.json({
            "msg": "Added your blog successfully to id "+userId,
            "id":res.id
          }));

    }catch(err: any){
        c.status(409);

        return (c.json({
            "msg": "Error occured while adding your blog",
            "err":err.message
          }));
    }
  
  });
  app.put("/", BlogInputUpdateValidation,async (c) => {
  
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    type blogBodyType = {
        title:string,
        content:string,
        id:string
    }
    const blogBody:blogBodyType= await c.req.json();
    try{
        const res = await prisma.blog.update({
            where:{
                id: parseInt(blogBody.id),
            },
            data:{
                title: blogBody.title,
                content: blogBody.content,
            }
        });

        if(!res){
            throw new Error(
                "Error updating blog post, not able to reach DB"
            )
        }

        c.status(200);
        return (c.json({
            "msg": "Updated your blog successfully to id "+blogBody.id,
            "id":res.id
          }));

    }catch(err: any){
        c.status(409);

        return (c.json({
            "msg": "Error occured while updating your blog",
            "err":err.message
          }));
    }
  
  
  });

  app.get("/bulk", async (c) => {
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try{
        const userId=9;

        const res = await prisma.blog.findMany({
            select:{
                content:true,
                title:true,
                id:true,
                publishDate:true,
                author:{
                    select:{
                        name:true
                    }
                }
            },
            orderBy:{
                publishDate:"desc"
            },
            skip:0,
            take:6
        });

        if(!res){
            throw new Error(
                "Error fetching the blogs from DB"
            )
        }

        c.status(200);
        return c.json({
            "msg": "Blogs fetched successfully",
            "blogs": res
          });

    }catch(err: any){
        c.status(409);
        return c.json({
            "msg": "Error occured while fetching blogs",
            "err":err.message
          });
    }  

  });
  
  app.get("/blogs/:id",async  (c) => {
   
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogId: string= c.req.param("id");
    console.log("Blog id "+blogId)
    try{
        const userId=9;

        const res = await prisma.blog.findFirst({
            where:{
                id: parseInt(blogId),
            },
            select:{
                content:true,
                title:true,
                id:true,
                publishDate:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        });
        console.log(res)
        if(!res){
            throw new Error(
                "Error fetching the blog from DB"
            )
        }

        c.status(200);
        return (c.json({
            "msg": "Blog fetched successfully",
            "blogs": res
          }));

    }catch(err: any){
        c.status(409);

        return (c.json({
            "msg": "Error occured while fetching your blog",
            "err":err.message
          }));
    }
  
  
  });

  //A route to get blogs while searching
  app.post("/bulksearch", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    try{    
        /*
            {
                searchKeyword
                skip
                take
            }
        */
        const body = await c.req.json();
        console.log("Inside blukSearch: ")
        console.log(body)
        //SELECT Count(*) FROM "Blog" WHERE content ~* 'lorem' OR title ~* 'lorem'
        const number_of_Blogs: {count:string}[]= await prisma.$queryRaw`SELECT Count(*) FROM "Blog" WHERE content ~* ${body.searchKeyword} OR title ~* ${body.searchKeyword}`;
        console.log(`number of blogs = `);
        if(number_of_Blogs[0] != null || number_of_Blogs[0] != undefined)
            console.log(number_of_Blogs[0]?.count)

        if(body.searchKeyword == ""){
            c.status(411)
            return c.json({
                msg:"Empty search"
            })
        }
        
        const res = await prisma.blog.findMany({
            where:{
                OR:[
                    {
                        content:{
                            contains:body.searchKeyword,
                            mode:'insensitive'
                        },
                        title:{
                            contains:body.searchKeyword,
                            mode:'insensitive'
                        }
                    }
                ]
                
            },
            select:{
                content:true,
                title:true,
                id:true,
                publishDate:true,
                author:{
                    select:{
                        name:true
                    }
                }
            },
            skip:body.skip,
            take:body.take
        })
        console.log("SearchBar blogs------------------------")
        console.log(res)
        if(res){
            c.status(200)
            return c.json({
                msg:"Fetched successfully in blogs paginately",
                blogs:res,
                number_of_Blogs:parseInt(number_of_Blogs[0]?.count)
            })
        }

    }catch(err){
        c.status(411)
        return c.json({
            err:err.message,
            status:"Error occured while seraching blogs paginately"
        })
    }


  })

  export default app;