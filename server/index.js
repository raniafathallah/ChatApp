const express=require('express');
const cors =require('cors');
const mongoose=require('mongoose');
const authRoutes = require("./routes/auth");
const messageRoutes=require("./routes/message");
const App=express();
require("dotenv").config();

App.use(express.json());  
App.use(cors());
const port =process.env.PORT

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE, {
     useNewUrlParser: true,
     useUnifiedTopology: true
 }).then(() => {
     console.log('DB connection stablished!'); 
     App.listen(port, () => {
         console.log(`<--- App running on ${process.env.NODE_ENV} (Port: ${port}) --->`);
     });
     
 }
 );
 App.use("/api/auth", authRoutes);
 App.use("/api/message",messageRoutes );



