import { io } from "socket.io-client";
let socket = io();

//Setup HTMl Buttons with Functions
const connectButton = document.querySelector("#connection-button") as HTMLElement;
const sendButton = document.querySelector("#send-button") as HTMLElement;

sendButton.onclick = connectToServer;
sendButton.onclick = sendMessage;

//Print a message on succesfull connection
socket.on("connect", () => {
  console.log("Connected!");
})


//Print a message, if the server sends a message back
socket.on("hello-message", () => {
  console.log("Hello from the server!");
})


//Connect to localhost, if server is up
function connectToServer() {
  socket = io("http://localhost:8000");

}

//Send a message to the server
function sendMessage() {
  console.log("Sending message")
  let clientMessage = { message: "Hello!" }
  socket.emit("client-message", clientMessage);
}
