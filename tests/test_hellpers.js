const Note = require("../models/notes");

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true
  }
]

const initialUsers = [
  {
    username: "EnzoF96",
    passwordHash: "1234",
    notes: []
}
]

const nonExistingId = async () =>{
    const note = new Note({content: 'willremovethissoon'});
    await note.save();
    await note.deleteOne()
    
    return note._id.toString()
}

const  notesInDB = async ()=>{
    const notes = await Note.find({});
    return notes.map(i => i.toJSON());
}

module.exports = {
    notesInDB,
    nonExistingId,
    initialUsers
}