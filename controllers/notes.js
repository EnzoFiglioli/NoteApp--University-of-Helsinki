const notesRouter = require('express').Router()
const Note = require('../models/notes');
const { getTokenFrom } = require('../utils/middleware');
const jwt = require("jsonwebtoken")

notesRouter.get('/', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

notesRouter.get('/:id', async(request, response, next) => {
  const notes = await Note.findById(request.params.id);

  response.json(notes);
})

notesRouter.post('/', async(request, response, next) => {
  const body = request.body
  const token = getTokenFrom(request);
  if(token){
    const note = new Note({
    content: body.content,
    important: body.important || false,
    
  });
    const saved = await note.save()
    return response.status(201).json(saved)
  }
  return response.status(403).json({message:'No authorization content'})
})

notesRouter.delete('/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

notesRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

module.exports = notesRouter