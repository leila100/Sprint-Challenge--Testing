const express = require("express");
const server = express();

server.use(express.json());
//get the list of current games
let games = [
  {
    title: "Pacman",
    genre: "Arcade",
    releaseYear: 1980
  }
];
// let games;

server.get("/", (req, res) => {
  res.status(200).json("Welcome to Games API Testing App");
});

server.post("/games", (req, res) => {
  const { title, genre, releaseYear } = req.body;
  if (!title || !genre) {
    res.status(422).json("The title and genre of the game are required information");
  } else {
    if (!games) {
      games = [];
    }
    const game = games.find(g => g.title === title);
    if (game) {
      res.status(405).json("A game with this title already exists");
    } else {
      const newGame = { title, genre, releaseYear };
      games.push(newGame);
      res.status(201).json(games);
    }
  }
});

server.get("/games", (req, res) => {
  if (!games) {
    games = [];
  }
  res.status(200).json(games);
});

module.exports = server;
