const express = require('express');
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid')

const PORT = process.env.PORT || 3001;

//initialize app
const app = express();

//GET route for notes.html 
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});
//GET route for index.html 
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});