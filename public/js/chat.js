//jshint esversion:8

const socket = io();

const messageForm = document.querySelector('#message-form');
const messageFormInput = messageForm.querySelector('input');
const messageFormButton = messageForm.querySelector('button');
const sendLocationButton = document.querySelector('#location');

    socket.on('message', (message)=>{
        console.log(message);
    });
    messageForm.addEventListener('submit', (e)=>{
        e.preventDefault();                             //To avoid full page reload on submission
        
        messageFormButton.setAttribute('disabled', 'disabled');
        
        const message = e.target.elements.message.value;
        socket.emit('sendMessage', message, (msg)=>{
        messageFormButton.removeAttribute('disabled');
        messageFormInput.value = '';
        messageFormInput.focus();
        //    if(error){
        //        return console.log(error);
        //    }
           console.log(msg);
        });
    });

    sendLocationButton.addEventListener('click', ()=>{
       if(!navigator.geolocation){
           return alert('Service is not supported by your browser!');
       }
       sendLocationButton.setAttribute('disabled', 'disabled');
       navigator.geolocation.getCurrentPosition((position)=>{
        socket.emit('sendLocation', {latitude: position.coords.latitude , longitude: position.coords.longitude}, ()=>{
            sendLocationButton.removeAttribute('disabled');
            console.log('Location Shared!');
        });
    });

       
});


