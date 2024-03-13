import zod from "zod"

export const signUpInput=  zod.object(
    {
        username:zod.string().email(),
        password:zod.string().min(6),
        name:zod.string().optional()
    }
)

export const signInInput=  zod.object(
    {
        username:zod.string().email(),
        password:zod.string().min(6),
    }
)

export const createBlogInput = zod.object({
    title:zod.string(),
    content:zod.string()
})

export const updateBlogInput = zod.object({
    title:zod.string(),
    content:zod.string(),
    id:zod.number()
})

export type SignInInputType = zod.infer<typeof signInInput>
export type CreateBlogType = zod.infer<typeof createBlogInput>
export type UpdateBlogType = zod.infer<typeof updateBlogInput>
export type SignUpInputType = zod.infer<typeof signUpInput>