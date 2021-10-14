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

 io.on("connection", (socket) => {
     socket.on("join_room", (roomName, done) => {
         socket.join(roomName);
         done();
         socket.to(roomName).emit("welcome");
     });
     io.on("offer", (offer, roomName) => {
         socket.to(roomName).emit("offer", offer);
     })
 });
 
 const handleListen = () => console.log(`Listening on http://localhost:3000`);
 httpServer.listen(3000, handleListen);