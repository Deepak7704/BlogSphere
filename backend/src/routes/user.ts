import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { env } from 'hono/adapter'
import { signUpInput } from '@verstappencodes/medium'
import { decode, verify, sign } from 'hono/jwt'
import bcrypt from 'bcryptjs'

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>();

// route-1 to register or signup the user
userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const { success } = signUpInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs are not valid"
    })
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: body.username }
    })

    if (existingUser) {
      c.status(409)
      return c.json({
        message: "User with this email already exists"
      })
    }

    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(body.password, saltRounds)

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.username, 
        password: hashedPassword 
      }
    })
    
    const token = await sign({ id: user.id }, c.env.JWT_SECRET)
    return c.json({
      name: user.name,
      jwt: token
    })
  } catch (e) {
    c.status(500)
    return c.json({
      message: "Failed to create user"
    })
  }
})

// route-2 to signin the user 
userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  const body = await c.req.json();
  
  try {
    // First find the user by email
    const user = await prisma.user.findUnique({
      where: {
        email: body.username, 
      }
    });
    
    if (!user) {
      c.status(403);
      return c.json({
        error: "Invalid email or password"
      })
    }
    const isPasswordValid = await bcrypt.compare(body.password, user.password)
    
    if (!isPasswordValid) {
      c.status(403);
      return c.json({
        error: "Invalid email or password"
      })
    }
    
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt, name: user.name });
  } catch (e) {
    c.status(500);
    return c.json({
      error: "Internal server error"
    })
  }
})