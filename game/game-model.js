let games = [];

module.exports = {
  fetchAll,
  insert,
  reset
};

function fetchAll() {
  return games;
}

function insert(game) {
  games.push(game);
  return games;
}

function reset() {
  games = [];
  return games;
}
