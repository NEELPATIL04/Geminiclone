const mongoose=require('mongoose');
require('dotenv').config();
const mongoURL =process.env.MONGODB_URI

mongoose.connect(mongoURL);
const db=mongoose.connection;
db.on('connected',()=>{
    console.log('connected to mongoDB');
    });
db.on('error',(err) =>{
    console.log('Error connecting to mongoDB',err);
});
db.on('disconnected',()=>{
    console.log('Disconnected from mongoDB');
});

module.exports=db;
