const express = require('express');
const path = require('path');
const fs = require('fs');
const apiroutes = require('./routes/apiroutes.js');

const PORT = process.env.PORT || 3001;

//initialize app
const app = express();

// //Middleware for parsing data
// app.use(express.static('public'));

// Middleware for parsing data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Use the apinotes router
app.use('/api/notes', apiroutes);

//GET route for notes.html 
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
//GET route for index.html 
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);