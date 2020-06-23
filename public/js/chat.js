//jshint esversion:8

const socket = io();

const messageForm = document.querySelector('#message-form');
const messageFormInput = messageForm.querySelector('input');
const messageFormButton = messageForm.querySelector('button');
const sendLocationButton = document.querySelector('#location');
const messages = document.querySelector('#messages');

//Templates
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML;
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML;

//Options
const {username, room} = Qs.parse(location.search, { ignoreQueryPrefix: true });


    socket.on('message', (message)=>{
        console.log(message);
        const html = Mustache.render(messageTemplate, {
            username: message.username,
            message: message.text,
            createdAt: moment(message.createdAt).format('h:mm a')

        });
        messages.insertAdjacentHTML('beforeend', html);
        
    });
    
    socket.on('locationMessage', (message)=>{
        console.log(message);
        const html = Mustache.render(locationMessageTemplate, {
            username: message.username,
            url: message.url,
            createAt: moment(message.createdAt).format('h:mm a')
        });
        messages.insertAdjacentHTML('beforeend', html);
    });
    socket.on('roomData', ({ room, users })=>{
        const html = Mustache.render(sidebarTemplate, {
            room: room,
            users: users
        });
        document.querySelector('#sidebar').innerHTML = html;
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

    socket.emit('join', { username, room }, (error)=>{
        if(error){
            alert(error);
            location.href = '/';
        }
    });