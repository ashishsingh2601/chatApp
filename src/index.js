//jshint esversion:9

const http = require('http');
const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const filter = require('bad-words');

const app = express();
const server = http.createServer(app);                      //Creating server outside express library 
const io = socketio(server);

const port = process.env.PORT || 4000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

io.on('connection', (socket)=>{
    console.log('New web socket connection!');

    socket.emit('message', 'Welcome!');
    socket.broadcast.emit('message', 'A new user has joined!');

    socket.on('sendMessage', (message, callback)=>{
        //const filter = new Filter()
        // if(filter.isProfane(message)){
        //     return callback('Bad words not allowed!');
        // }

        io.emit('message', message);
        callback('Message Delivered!');
    });

    socket.on('disconnect', ()=>{
        io.emit('message', 'A user has left!');
    });
    
    socket.on('sendLocation', (coords, callback)=>{
        io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`);
        callback();
    });
});

server.listen(port, ()=>{
    console.log(`Server is up on port ${port}!`);
});