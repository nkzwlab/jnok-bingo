import { Hono } from "https://deno.land/x/hono@v4.3.11/mod.ts";

const app = new Hono();

app.get("/", (c) => c.text("Hello Deno!"));

Deno.serve(app.fetch);
