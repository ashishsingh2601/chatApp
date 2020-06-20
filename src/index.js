//jshint esversion:8

const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT || 4000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

app.listen(port, ()=>{
    console.log(`Server is up on port ${port}!`);
});