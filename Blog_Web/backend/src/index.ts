import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { jwt, sign } from 'hono/jwt';
import routes from "./routes";
import { cors } from 'hono/cors';
const app = new Hono<{
  Bindings:{
    DATABASE_URL:string,
    JWT_SECRET:string
  }
}>();
app.use("/*",cors())
app.route("/api/v1", routes)




export default app;
