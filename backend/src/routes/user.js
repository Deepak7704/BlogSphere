import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { signUpInput } from '@verstappencodes/medium';
import { sign } from 'hono/jwt';
export const userRouter = new Hono();
// route-1 to register or signup the user
userRouter.post('/signup', async (c) => {
    //user gives the username(can be a mail),first name,last name and password
    // in the body
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const { success } = signUpInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs are not valid"
        });
    }
    const user = await prisma.user.create({
        data: {
            name: body.name,
            email: body.username,
            password: body.password
        }
    });
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
        jwt: token
    });
});
// route-2 to signin the user 
userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const user = await prisma.user.findUnique({
        where: {
            email: body.username,
            password: body.password
        }
    });
    if (!user) {
        c.status(403);
        return c.json({
            error: "User not found"
        });
    }
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
});
