import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { jwt, sign } from 'hono/jwt';
import InputValidationSignUp from '../middleware/zodUserValidationSignup'
import InputValidationSignIn from '../middleware/zodUserValidationSignin'
const app = new Hono<{
    Bindings:{
      DATABASE_URL:string,
      JWT_SECRET:string
    }
  }>();



app.post("/signup", InputValidationSignUp,async (c) => {

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

    type userBodyType = {
      username:string,
      password:string,
      name:string,
    }; 
    const userBody: userBodyType= await c.req.json();  
    
    try{
      const res = await prisma.user.create({
        data:{
          username:userBody.username,
          password:userBody.password,
          name:userBody.name,
        }
      });
  
      console.log(res)
      const jwt = await sign({
        id: res.id,
        uname: userBody.username,
        name:userBody.name
      }, c.env.JWT_SECRET);
      c.status(200);
      return (c.json({
        "msg": "Signied Up Successfully",
        "token":jwt
      }));
  
    }catch(err: any){
      c.status(411)
      return (c.json({
        "msg": "Error occured while Signing Up",
        "err": err.message
      }));
    }
  
  });
  app.post("/signin", InputValidationSignIn ,async (c) => {
  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

    type userBodyType = {
      username:string,
      password:string,
    }; 
    const userBody: userBodyType= await c.req.json();
    // const userData: userBodyType = {
    //   username : userBody.username,
    //   password : userBody.password,
    // }
    try{
      const res = await prisma.user.findFirst(
        {
          where:{
            username:userBody.username,
            password:userBody.password
          },
          select:{
            id:true,
            name:true
          }
        }
      )
      console.log(res)
      if(!res){
        throw new Error("Invalid user credentials")
      }
  
      const jwt = await sign({
        id: res.id,
        uname: userBody.username,
        name: res.name
      }, c.env.JWT_SECRET);
      c.status(200)
      return (c.json({
        "msg": "Signied In Successfully",
        "token":jwt
      }));
      
    }catch(err: any){
      c.status(403)
      return (c.json({
        "msg": "Error occured while Signing In",
        "err": err.message
      }));
    }
  
  });

  export default app;