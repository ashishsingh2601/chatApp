//jshint esversion:8

const http = require('http');
const express = require('express');
const path = require('path');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);                      //Creating server outside express library 
const io = socketio(server);

const port = process.env.PORT || 4000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

io.on('connection', (socket)=>{
    console.log('New web socket connection!');

    socket.emit('message', 'Welcome!');
    socket.on('sendMessage', (message)=>{
        io.emit('message', message);
    });
});

server.listen(port, ()=>{
    console.log(`Server is up on port ${port}!`);
});