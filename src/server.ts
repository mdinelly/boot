import express from "express";
import http from "http";
import bodyParser from "body-parser";
import * as socketio from "socket.io";

import BotRouter from "./routers/bot";
import startAllConexao from "./whatsapp/startAllConexao";

const app = express();
const server = http.createServer(app);

const io = new socketio.Server(server, {
  cors: {
    origin: [
      "https://ftgsmserver.com/",
      "https://sms.ftgsmserver.com/",
      "https://kit.ftgsmserver.com/",
      "https://new.ftgsmserver.com/",
    ],
    credentials: true,
  },
  allowEIO3: true,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Origin", "*");
  res.header(
    "Access-Control-Header",
    "Origin, X-Requrested-With, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).send({});
  }

  next();
});

app.use("/", BotRouter);

app.use(express.json());

startAllConexao(io);

app.set("socketio", io);

server.listen(3333, () => console.log("server running on port 3333"));
