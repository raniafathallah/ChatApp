const express=require('express');
const cors =require('cors');
const mongoose=require('mongoose');

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

// const server=app.listen(process.env.PORT,()=>{
//      console.log(`listen to server on port ${process.env.PORT}`)
// })
