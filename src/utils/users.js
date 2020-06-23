//jshint esversion:9

const users = [];

//Add user(start tracking a user)

const addUser = ({ id, username, room })=>{
    //Clean the data
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();

    //Validate the data
    if(!username || !room){
        return{
            error: 'All fields are required to be filled!'
        };
    }

    //Check for existing user
    const existingUser = users.find((user)=>{
        return user.room === room && user.username === username;

    });

    //Validate username
    if(existingUser){
        return{
            error: 'Username already taken!'
        };
    }

    //Store user
    const user = {id, username, room};
    users.push(user);
    return { user };
};

//Remove user
const removeUser = (id)=>{
    const index = users.findIndex((user)=>{
        return user.id === id;
    });

    if(index != -1){
        return users.splice(index, 1)[0];
    }
};

//Get user
const getUser = (id)=>{
    return users.find((user)=> user.id === id);

};

//Get users in room
const getUsersInRoom = (room)=>{
    room = room.trim().toLowerCase();
    return users.filter((user)=> user.room === room);
};

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
};