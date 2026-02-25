require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Note = require("./models/note");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));


// Create note
app.post("/notes", async (req, res) => {
  const note = new Note(req.body);
  await note.save();
  res.json(note);
});

// Get all notes
app.get("/notes", async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

app.listen(process.env.PORT, () =>
  console.log("Server running")
);