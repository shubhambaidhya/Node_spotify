import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  name: String,
  artist: String,
  genre: String,
});

const Songs = mongoose.model("Songs", songSchema);

export default Songs;
