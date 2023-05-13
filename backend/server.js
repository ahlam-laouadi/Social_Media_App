const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
import path from "path";
import { Server } from "socket.io";
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
import sockets from "./socket/sockets.js";
import { fileURLToPath } from "url";
const app = express();

require("dotenv").config();

//middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
//
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//server port
const port = process.env.PORT;

//connect to database
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to database");
  } catch (error) {
    console.log(error);
  }
};

connectToDatabase();
//use routes
app.use("/", userRoutes);
app.use("/", postRoutes);

//home page
app.get("/", function (req, res) {
  res.send("it's working");
});

//start server
app.listen(port, (err) => {
  if (err) console.log(err);
  console.log('server started at port',port);
});
io.on("connection", sockets);
httpServer.listen(port, (err) => {
  if (err) console.log(err);
  console.log('server started at port',port);
});
