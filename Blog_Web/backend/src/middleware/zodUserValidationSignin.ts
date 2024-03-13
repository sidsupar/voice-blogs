import { signInInput, SignInInputType } from "@sidsupar/medium-commons";

export default async function InputValidationSignup(c: any, next: any){

    const body: SignInInputType = await c.req.json();
    console.log(body)
    try{    

        const userBody = signInInput.safeParse(body);
        console.log(userBody)
        if(userBody.success == true){
            await next()
        }else{
            throw new Error("Invalid input")
        }
    }catch(err: any){
        c.status(409);
        return c.json({
            msg:"Invalid input",
            err:err.message
        })
    }

}