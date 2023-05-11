import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { readdirSync } from "fs";
import { createServer } from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/post.js";

const app = express();
const http = createServer(app);
const socketio = new Server(http, {
  path: "/socket.io",
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-type"],
  },
});

dotenv.config();

//db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("DB connection error => ", err));

//middleware
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
  })
);

// autoload routes
// readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));
app.use("/api", [authRoutes, postRoutes]);

// socket io
// socketio.on("connect", (socket) => {
//   // console.log("Socket.io =>", socket.id);
//   socket.on("send-message", (message) => {
//     // console.log("new message received from client =>", message);
//     socket.broadcast.emit("receive-message", message);
//   });
// });

socketio.on("connect", (socket) => {
  // console.log("Socket.io =>", socket.id);
  socket.on("new-post", (newPost) => {
    // console.log("new post received from client =>", newPost);
    socket.broadcast.emit("new-post", newPost);
  });
});

app.post("/api/register", (req, res) => {
  console.log("Register Endpoint =>", req.body);
});

const port = process.env.PORT || 8000;

http.listen(port, () => console.log(`Server is runnning on port ${port}`));
