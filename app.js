const express = require("express");
const multer = require("multer");
const path = require('path');

const personController = require("./controller/personController");

const app=express();
const upload=multer();

app.use(express.static(path.join(__dirname,'views')));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

app.post('/api/upload',upload.single('file'),personController);

module.exports = app;
