import { z } from "zod";
export declare const signUpInput: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const signInInput: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const createBlogPost: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, z.core.$strip>;
export declare const updateBlogPost: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    id: z.ZodString;
}, z.core.$strip>;
