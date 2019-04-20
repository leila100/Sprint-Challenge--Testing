const express = require("express");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json("Welcome to Games API Testing App");
});

server.post("/games", (req, res) => {
  const { title, genre, releaseYear } = req.body;
  if (!title || !genre) {
    res.status(422).json("The title and genre of the game are required information");
  } else {
    res.status(200).json("");
  }
});
module.exports = server;
