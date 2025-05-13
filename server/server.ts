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

//Array containing all users
interface User {
  username: String,
  password: String
}
const users = [{ username: "Rasmus", password: "SA" }, { username: "Herluf", password: "H-bag" }]

//Array containing all the messages sent to the server
const messageLog = { messages: [{}] };

//On connection, console log socket id and send a welcome message
io.on('connection', (socket) => {
  console.log(`${socket.id} joined!`);

  let user: User;
  socket.on("login-message", (arg: User) => {
    console.log(`Client tried to log on with Username: ${arg.username} and Password: ${arg.password}`)
    user = arg;

    //Check if the user is registered on the server
    if (users.find(u => u.username === user.username && u.password === user.password)) {
      console.log(`${user.username} logged in!`);
      socket.emit("server-message", `Login sucessfull!`);
    } else {
      socket.emit("server-message", "Wrong login credentials")
      socket.disconnect();
    }
  })






  //Setup listening for client messages
  socket.on("client-message", (arg) => {
    //Print the message
    console.log(`From client(${user.username})" ${arg}`)
    //Send back a list of messages sent to the server
    let currentTime = new Date();
    let message = { time: currentTime.toLocaleTimeString(), username: user.username, string: arg };
    messageLog.messages.push(message);
    io.emit("server-message-log", messageLog);
  })
})


//Start server
io.listen(8010);
// httpServer.listen(8010);
console.log("listening on port 8010")


