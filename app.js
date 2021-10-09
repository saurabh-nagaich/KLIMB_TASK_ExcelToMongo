const express = require("express");
const multer = require("multer");
const path = require('path');

const uploadAsyncController = require("./controller/personController");

const app=express();
const upload=multer();

// app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'views')));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

app.post('/api/upload',upload.single('file'),uploadAsyncController);

module.exports = app;
