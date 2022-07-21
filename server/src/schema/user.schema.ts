import { z } from "zod";

const registerUserSchema = z.object({
    body: z.object({
        username: z.string({
            required_error: "username is required"
        }),
        password: z.string({
            required_error: "password is required"
        })
        .min(6, "Password must be at least 6 characters")
        .max(30, "Password can be max 30 characters.")
    })
});

const loginUserSchema= z.object({
    body: z.object({
        username: z.string({
            required_error: "needs to be string"
        }),
        password: z.string({
            required_error: "needs to be string"
        })
    })
});

export { registerUserSchema, loginUserSchema };
export type createUserInput = z.TypeOf<typeof registerUserSchema>;
export type loginUserInput = z.TypeOf<typeof loginUserSchema>;