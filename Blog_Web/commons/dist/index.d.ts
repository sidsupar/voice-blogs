import zod from "zod";
export declare const signUpInput: zod.ZodObject<{
    username: zod.ZodString;
    password: zod.ZodString;
    name: zod.ZodOptional<zod.ZodString>;
}, "strip", zod.ZodTypeAny, {
    username: string;
    password: string;
    name?: string | undefined;
}, {
    username: string;
    password: string;
    name?: string | undefined;
}>;
export declare const signInInput: zod.ZodObject<{
    username: zod.ZodString;
    password: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export declare const createBlogInput: zod.ZodObject<{
    title: zod.ZodString;
    content: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export declare const updateBlogInput: zod.ZodObject<{
    title: zod.ZodString;
    content: zod.ZodString;
    id: zod.ZodNumber;
}, "strip", zod.ZodTypeAny, {
    title: string;
    content: string;
    id: number;
}, {
    title: string;
    content: string;
    id: number;
}>;
export type SignInInputType = zod.infer<typeof signInInput>;
export type CreateBlogType = zod.infer<typeof createBlogInput>;
export type UpdateBlogType = zod.infer<typeof updateBlogInput>;
export type SignUpInputType = zod.infer<typeof signUpInput>;
