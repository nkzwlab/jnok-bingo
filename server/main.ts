import { serve } from "https://deno.land/std@0.150.0/http/server.ts";
import { Hono } from "https://deno.land/x/hono@v4.3.11/mod.ts";
import { ref, watch } from "npm:vue";
const app = new Hono();

// app.get("/", (c) => c.text("Hello Deno!"));

import { Server } from "https://deno.land/x/socket_io@0.1.1/mod.ts";
import { generateNewNumber } from "./bingologic.ts";

const io = new Server({
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`socket ${socket.id} connected`);

  socket.emit("hello", "world");

  socket.on("disconnect", (reason) => {
    console.log(`socket ${socket.id} disconnected due to ${reason}`);
  });

  socket.on(
    "updateUser",
    (data: { name: string; status: number; uuid: string }) => {
      currentUsersStatus.value[data.uuid] = {
        name: data.name,
        status: data.status,
      };
    }
  );

  socket.on("newNumber", () => {
    console.log("newNumber");
    const newNumber = generateNewNumber(oldNumbers.value);
    oldNumbers.value.push(newNumber);
    io.emit("nextNumber", newNumber);
    io.emit("allNumbers", oldNumbers.value);
  });
});


const currentUsersStatus = ref<{
  [key: string]: { name: string; status: number };
}>({});

watch(currentUsersStatus, () => {
  const BingoPeople = Object.values(currentUsersStatus.value)
    .filter((user) => user.status === 0)
    .map((user) => user.name);
  const ReachPeople = Object.values(currentUsersStatus.value)
    .filter((user) => user.status === 1)
    .map((user) => user.name);
  io.emit("updateBingoPeople", {
    BingoPeople,
    ReachPeople,
  });
});

const oldNumbers = ref<number[]>([]);

const handler = io.handler(async (req) => {
  return await app.fetch(req);
});

await serve(handler, {});
