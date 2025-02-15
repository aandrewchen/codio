import { Hono } from "hono";
import { cors } from "hono/cors";

const api = new Hono().basePath("/api/v1");

api.use(
  cors({
    origin: ["http://localhost:5173", "https://codio.com"],
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

api.route("/hello").get((req, res) => {
  res.json({ message: "Hello, World!" });
});

export default {
  port: 8080,
  fetch: api.fetch,
};
