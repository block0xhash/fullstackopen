require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Note = require('./models/note');

const app = express();
app.use(cors())


// Define a custom token for Morgan to log request body
morgan.token('postData', (req) => {
    return JSON.stringify(req.body);
});

// Add Morgan middleware with 'tiny' configuration
app.use(morgan('tiny'));

// Add Morgan middleware with custom token to log request body for POST requests
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData', {
  skip: (req, res) => req.method !== 'POST' // Skip logging for non-POST requests
}));

// Middleware to parse JSON request bodies
app.use(express.json());

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        console.log(password);
      response.json(notes)
    })
  })

// GET request to get a specific person by ID
app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })
})


app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

// Start the server
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
