let games = [];
let id = 1;

module.exports = {
  fetchAll,
  insert,
  reset,
  fetchGameById,
  remove
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
  const game = games.find(g => g.id === id);
  return game;
}

function remove(id) {
  const count = games.find(g => g.id === id);
  if (count) {
    games.filter(game => game.id !== id);
    return 1;
  } else {
    return 0;
  }
}
