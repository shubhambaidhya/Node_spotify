import express from "express";
import Songs from "./songs.model.js";
import mongoose from "mongoose";

const router = express.Router();

// ? add songs
router.post("/songs/add", async (req, res) => {
  const newSongs = req.body;

  await Songs.create(newSongs);

  return res.status(201).send({ message: "Song is added successfully" });
});

// ? to get songs list
router.get("/songs/list", async (req, res) => {
  const songs = await Songs.find();
  return res.status(200).send({ mesaage: "Success", songsList: songs });
});

//? to get songs details by id
router.get("/songs/detail/:id", async (req, res) => {
  //? 1. extract song id from req.params
  const songId = req.params.id;

  //? 2. check for mongo id validity
  const isValidId = mongoose.isValidObjectId(songId);

  //? 3. if not valid mongo id, throw error
  if (!isValidId) {
    return res.status(200).send({ message: "Invalid mongo ID..." });
  }

  //? 4. find song using songId
  const song = await Songs.findById(songId);

  //? 5. if no songs, throw error
  if (!song) {
    return res.status(404).send({ message: "Song does not exist " });
  }

  // ? 6. send res
  return res.status(200).send({ message: "success", songDetail: song });
});

export default router;

// ? delete song detail by id
router.delete("/song/delete/:id", async (req, res) => {
  const songId = req.params.id;

  const isValidId = mongoose.isValidObjectId(songId);

  if (!isValidId) {
    return res.status(404).send({ message: "Invalid Mongo Id..." });
  }
  const song = await Songs.findById(songId);
  if (!song) {
    return res.status(404).send({ message: "Song does not exist..." });
  }
  await Songs.findByIdAndDelete(songId);
  return res.status(200).send({ message: "Song is deleted successfully" });
});
