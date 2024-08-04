const WebSocket = require("ws");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

let wss;
let io;
const clients = {}; // تخزين الرسائل في الذاكرة

const initializeWebSocket = (server) => {
  wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log("New WebSocket client connected");

    ws.on("message", (message) => {
      console.log("Received WebSocket message:", message);
    });

    ws.on("close", () => {
      console.log("WebSocket client disconnected");
    });
  });

  io = new Server(8080, {
    cors: {
      origin: '*'
    }
  });
  io.use((socket,next)=>{
    const headers = socket.handshake.headers
  
    if(!headers.token){
      next(new Error("invalid"))
    }else{
      socket.join("room-" + headers.user_id)
      socket.user = {token:headers.token , user_id:headers.user_id}
      console.log(  socket.user);
      next()
    }
   })
  
   io.on("connection",(socket)=>{
  
    socket.use((socket , next)=>{
      console.log(socket);
      if(socket[0]!== "message"){
        next(new Error("socket middleware error"))
      }else{
        next()
      }
    
    })
    const user_id = socket.handshake.headers.user_id;
    clients[user_id] = {socket_id:socket.id , user_id}
    console.log(clients);
  
    socket.on("messages",(data)=>{
      console.log("messages",data);
      data.success = true
      socket.to("room-" + data.to).emit("message",data)
      socket.emit("message",data)
    })
    socket.on("error",(error)=>{
      socket.emit("error",{error:error.message})
    })
    socket.on("disconnect",()=>{
      console.log(socket.id);
      for(const key in clients){
        if(clients[key].socket_id === socket.id){
          delete clients[key]
        }
      }
      console.log(clients);
    })
   })

  return { wss, io };
};

const getWebSocketServer = () => {
  if (!wss) {
    throw new Error("WebSocket server is not initialized. Call initializeWebSocket first.");
  }
  return wss;
};

const getSocketServer = () => {
  if (!io) {
    throw new Error("Socket.IO server is not initialized. Call initializeWebSocket first.");
  }
  return io;
};

module.exports = { initializeWebSocket, getWebSocketServer, getSocketServer };