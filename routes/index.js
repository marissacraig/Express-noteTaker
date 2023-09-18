const express = require('express');

const notesRouter = require('./notes');

const app = express();
// Send all the requests that begin with api/notes to the notes router
app.use('api/notes', notesRouter);

module.exports = app;