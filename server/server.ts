import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:8000"
  }
});

io.on('connection', (socket) => {
  console.log(`${socket.id} joined!`);
})

io.listen(8010);


