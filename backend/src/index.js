import { Hono } from 'hono';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blogs';
import { cors } from 'hono/cors';
const app = new Hono();
app.use('/*', cors());
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blogs", blogRouter);
export default app;
