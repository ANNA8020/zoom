import http from "http";
import SocketIO from "socket.io";
import express from "express";

 const app = express();

 app.set("view engine", "pug");
 app.set("views", __dirname + "/views");
 app.use("/public", express.static(__dirname + "/public"));
//  public folder를 유저에게 공개해줌
 app.get("/", (_,res) => res.render("home"));
 app.get("/*", (_,res) => res.redirect("/"));
 
 const httpServer = http.createServer(app);
 const io = SocketIO(httpServer);
 
 const handleListen = () => console.log(`Listening on http://localhost:3000`);
 httpServer.listen(3000, handleListen);