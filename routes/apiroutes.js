const apinotes = require("express").Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

// const readFromFile = (filePath) => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filePath, 'utf8', (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(data);
//       }
//     });
//   });
// };

// const readAndAppend = (content, file) => {
//   fs.readFile(file, 'utf8', (err, data) => {
//     if (err) {
//       console.error(err);
//     } else {
//       const parsedData = JSON.parse(data);
//       parsedData.push(content);
//       fs.writeFile(file, JSON.stringify(parsedData, null, 2), (writeErr) =>
//         writeErr ? console.error(writeErr) : console.info(`Successfully updated ${file}`)
//       );
//     }
//   });
// };

const noteData = fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8');

const savedNotes = JSON.parse(noteData);
console.log(savedNotes);

// GET Route for retrieving api notes from db file
apinotes.get('/', (req, res) => {
  console.info(`${req.method} request received for api notes`);
  res.sendFile(path.join(__dirname, '../db/db.json'));
});

// POST Route to add a new api note
apinotes.post('/', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  console.log(req.body);

  if (req.body) {
    const newNote = {
      title: req.body.title,
      text: req.body.text,
      tip_id: uuidv4(),
    };

    savedNotes.push(newNote);
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(savedNotes, null, 2));
    res.json(`New note added successfully`);
  } else {
    res.status(400).send('Error in adding new note');
  }
});

module.exports = apinotes;