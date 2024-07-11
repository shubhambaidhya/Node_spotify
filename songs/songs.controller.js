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

export default router;
