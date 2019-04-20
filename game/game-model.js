let games = [];
let id = 1;

module.exports = {
  fetchAll,
  insert,
  reset,
  fetchGameById
};

function fetchAll() {
  return games;
}

function insert(game) {
  game.id = id;
  id++;
  games.push(game);
  return games;
}

function reset() {
  games = [];
  id = 1;
  return games;
}

function fetchGameById(id) {
  return games.find(g => g.id === id);
}
