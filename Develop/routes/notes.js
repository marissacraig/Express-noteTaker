const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');

const { readFromFile, writeToFile, readAndAppend } = require('../helpers/helpers');

// This API route is a GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/db.json').then((data) => 
  res.json(JSON.parse(data)));
});

// GET Route for a specific note
notes.get('/note_id', (req, res) => {
  const noteId = req.params.note_id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((notes) => notes.note_id === noteId);
      return result.length > 0
        ? res.json(result)
        : res.json('No tip with that ID');
    });
});

// This API route is a POST Route for a new note
notes.post('/', (req, res) => {
  console.info(`${req.method} request received to add a note`);

  const { title, note } = req.body;

  if (title && note) {
    const newNote = {
      title,
      note,
      note_id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});

// BONUS: DELETE /api/notes/:id should receive a query parameter that contains the id of a note to delete. 
// To delete a note, you'll need to read all notes from the db.json file, 
// remove the note with the given id property, and then rewrite the notes to the db.json file.
// DELETE Route for a specific tip
notes.delete('/note_id', (req, res) => {
  const noteId = req.params.note_id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all tips except the one with the ID provided in the URL
      const result = json.filter((notes) => notes.note_id !== noteId);

      // Save that array to the filesystem
      writeToFile('./db/db.json', result);

      // Respond to the DELETE request
      res.json(`Item ${noteId} has been deleted 🗑️`);
    });
});

module.exports = notes;
