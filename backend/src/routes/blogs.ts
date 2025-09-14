import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
  Variables: {
    userId: string
  }
}>()

// Authentication middleware
blogRouter.use('/*', async (c, next) => {
  const authHeader = c.req.header('Authorization')

  if (!authHeader) {
    c.status(401)
    return c.json({ message: 'Authorization header missing' })
  }

  // Strip "Bearer " prefix if present
  const token = authHeader.replace('Bearer ', '').trim()

  try {
    const payload = await verify(token, c.env.JWT_SECRET) as { id: string }

    if (!payload?.id) {
      c.status(403)
      return c.json({ message: 'Invalid token payload' })
    }

    c.set('userId', payload.id)
    await next()
  } catch (err) {
    c.status(403)
    return c.json({ message: 'Invalid or expired token' })
  }
})

// Create a blog post
blogRouter.post('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const authorId = c.get('userId')
    const body = await c.req.json()

    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId,
      },
    })

    return c.json({ id: blog.id })
  } catch (e) {
    c.status(411)
    return c.json({ message: 'Cannot create the blog post' })
  }
})

// Update a blog post
blogRouter.put('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const body = await c.req.json()

    const blog = await prisma.post.update({
      where: { id: body.id },
      data: {
        title: body.title,
        content: body.content,
      },
    })

    return c.json({ blog })
  } catch (e) {
    c.status(411)
    return c.json({ message: 'Cannot update the blog post' })
  }
})

// Get all blogs (bulk, with pagination later)
blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const blogs = await prisma.post.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        createdAt: true,  
        author: {
          select: {
            name: true,
            email: true  
          }
        },
      },
      orderBy: {
        createdAt: 'desc' 
      }
    })


    return c.json({ blogs })
  } catch (e) {
    c.status(500)
    return c.json({ message: 'Error fetching blogs' })
  }
})

// Get a blog by id
blogRouter.get('/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const id = c.req.param("id");
    const blog = await prisma.post.findFirst({
      where: { id: id },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true, 
        author: {
          select: {
            name: true,
            email: true 
          }
        }
      }
    })

    if (!blog) {
      c.status(404)
      return c.json({ message: 'Blog post not found' })
    }

    return c.json({ blog })
  } catch (e) {
    c.status(411)
    return c.json({
      message: 'Error while getting the blog post with provided id',
    })
  }
})