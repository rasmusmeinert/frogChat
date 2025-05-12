import { createServer } from "http";
import { Server } from "socket.io";

//Setup server
const httpServer = createServer();
const io = new Server(httpServer, {
  //Handle cors errors from localhost:8000
  cors: {
    origin: "http://localhost:8000"
  }
});

const messageLog = { messages: [{}] };

//On connection, console log socket id and send a welcome message
io.on('connection', (socket) => {
  console.log(`${socket.id} joined!`);
  socket.emit("server-message", "Welcome on the Server!");


  //Setup listening for client messages
  socket.on("client-message", (arg) => {
    //Print the message
    console.log(`From client(${socket.id}): ${arg}`)
    //Send back a list of messages sent to the server
    let currentTime = new Date();
    let message = {time: currentTime.toLocaleTimeString(), string: arg};
    messageLog.messages.push(message);
    socket.emit("server-message", messageLog);
  })
})


//Start server
// io.listen(8010);
httpServer.listen(8010);
console.log("listening on port 8010")


