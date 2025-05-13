import { io } from "socket.io-client";
let socket = io();

//Setup HTMl Buttons with Functions
const connectButton = document.querySelector("#connection-button") as HTMLElement;
const sendButton = document.querySelector("#send-button") as HTMLElement;
const messageWindow = document.querySelector("#message-window") as HTMLElement;
const usernameTextField = document.querySelector("#username-text-field") as HTMLInputElement;
const passwordTextField = document.querySelector("#password-text-field") as HTMLInputElement;
const textField = document.querySelector("#text-field") as HTMLInputElement;

connectButton.onclick = connectToServer;
sendButton.onclick = sendMessage;

//Print a message, if the server sends a message back
socket.on("server-message", () => {
  console.log("Hello from the server!");
})


//Connect to localhost, if server is up
function connectToServer() {
  console.log("Connecting to Server!");
  socket = io("http://localhost:8010"), {
    withCredentials: true,
    extraHeaders: {
    }
  };

  let user = { username: usernameTextField.value, password: passwordTextField.value }

  //Send login information to server
  socket.emit("login-message", user);

  //Setup communication with server
  interface Message {
    username: String,
    time: String,
    string: String,
  }


  //Print messages from server
  socket.on("server-message", args => {
    console.log(`From server: ${args}`)
  })

  //Print messages recieved from the server in html
  socket.on("server-message-log", (arg) => {
    let messages = arg.messages;
    let html = [""];
    messages.forEach((element: Message) => {
      html.push(`<p>[${element.time}] ${element.username}: ${element.string}</p>`)
    })
    messageWindow.innerHTML = html.join("");
  })


  //Setup socket behaviour, 
  socket.on("connect", () => {
    console.log("Connected!");
    const engine = socket.io.engine;

    //Check if websocket is correctly established
    // engine.once("upgrade", () => {
    //   console.log(`My transport method is now: ${engine.transport.name} `)
    // })

  })
}

//Send a message to the server
function sendMessage() {
  console.log("Sending message")
  socket.emit("client-message", textField.value);
  textField.value = "";
}


