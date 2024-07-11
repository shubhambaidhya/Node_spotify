import express from "express";
import connectDB from "./connect.db.js";
import songRoutes from "./songs/songs.controller.js";
const app = express();

//to make app understand json
app.use(express.json());

//connect db
connectDB();

//network port and server
const PORT = 8079;

//to register router
app.use(songRoutes);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
