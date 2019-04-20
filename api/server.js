const express = require("express");
const server = express();

const Games = require("../game/game-model");

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json("Welcome to Games API Testing App");
});

server.post("/games", (req, res) => {
  const { title, genre, releaseYear } = req.body;
  if (!title || !genre) {
    res.status(422).json("The title and genre of the game are required information");
  } else {
    let games = Games.fetchAll();
    const game = games.find(g => g.title === title);
    if (game) {
      res.status(405).json("A game with this title already exists");
    } else {
      const newGame = { title, genre, releaseYear };
      games = Games.insert(newGame);
      res.status(201).json(games);
    }
  }
});

server.get("/games", (req, res) => {
  const games = Games.fetchAll();
  res.status(200).json(games);
});

server.get("/games/:id", (req, res) => {
  const { id } = req.params;
  const game = Games.fetchGameById(id);
  if (!game) {
    res.status(404).json("Invalid id");
  }
});

module.exports = server;
