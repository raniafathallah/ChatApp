const express=require('express');
const cors =require('cors');
const mongoose=require('mongoose');
const authRoutes = require("./routes/auth");
const messageRoutes=require("./routes/message");
const App=express();
require("dotenv").config();
const socket = require("socket.io");

App.use(express.json());  
App.use(cors());
const port =process.env.PORT

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE, {
     useNewUrlParser: true,
     useUnifiedTopology: true
 }).then(() => {
     console.log('DB connection stablished!'); 
    //  App.listen(port, () => {
    //      console.log(`<--- App running on ${process.env.NODE_ENV} (Port: ${port}) --->`);
    //  });
     
 }
 );
 App.use("/api/auth", authRoutes);
 App.use("/api/message",messageRoutes );

 const server = App.listen(process.env.PORT, () =>
 console.log(`Server started on ${process.env.PORT}`)
);

 const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});

