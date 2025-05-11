import { Server, Socket } from "socket.io";

const io = new Server({});

io.on("connection", socket => {
  console.log(`Connection established with ${socket.id}`);
  socket.emit("hello-message");

});

io.on("client-message", e =>{
  console.log(`Client message recieved: ${e.message}`)
});

console.log("Now listening on port 8010")

io.listen(8010);
