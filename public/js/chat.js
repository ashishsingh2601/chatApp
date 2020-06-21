//jshint esversion:8

const socket = io();
    socket.on('message', (message)=>{
        console.log(message);
    });
    document.querySelector('#message-form').addEventListener('submit', (e)=>{
        e.preventDefault();                                                         //To avoid full page reload on submission
        const message = e.target.elements.message.value;
        socket.emit('sendMessage', message);
    });

    document.querySelector('#location').addEventListener('click', ()=>{
       if(!navigator.geolocation){
           return alert('Service is not supported by your browser!');
       }

       navigator.geolocation.getCurrentPosition((position)=>{
        socket.emit('sendLocation', {latitude: position.coords.latitude , longitude: position.coords.longitude});
       });

       
    });


