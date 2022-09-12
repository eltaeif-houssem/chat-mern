// Import core modules
import mongoose from "mongoose";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import socketServer from "./socket.js";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";

// Import routes
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import chatRoute from "./routes/chat.js";

// Import custom modules
import errorHandler from "./handlers/errorHandler.js";

dotenv.config();
// Define vars
const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

const PORT = process.env.PORT || 3001;
const DB_URL = process.env.DB_URL;
const JWT_SECRET = process.env.JWT_SECRET;
// Init middlewares
app.use(express.json({ limit: "5mb", extended: true }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    key: "jwt",
    secret: JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    store: MongoStore.create({
      mongoUrl: DB_URL,
      dbName: "meetmate",
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    },
  })
);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/chat", chatRoute);
app.use(errorHandler);

// Database and server app in running...
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Database connected!");
    server.listen(PORT);
    socketServer(io);
  })
  .catch((e) => {
    console.log("Cannot connect to the database!");
    console.log({ error: e.message });
  });
