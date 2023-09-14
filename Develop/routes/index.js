const express = require('express');

const notesRouter = require('./notes');

const app = express();
// Send all the requests that begin with /notes to the notes router
app.use('/notes', notesRouter);

module.exports = app;