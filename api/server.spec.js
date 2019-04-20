const request = require("supertest");

const server = require("./server.js");

const Games = require("../game/game-model");

beforeEach(() => {
  Games.reset();
});

describe("GET /", () => {
  it("should return status 200, json message Welcome to Games API Testing App", async () => {
    const res = await request(server).get("/");

    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body).toBe("Welcome to Games API Testing App");
  });
});

describe("POST /games", () => {
  it("should return a status of 422 if required fields are not included", async () => {
    const res = await request(server)
      .post("/games")
      .send({})
      .set("Accept", "application/json");
    expect(res.status).toBe(422);
  });

  it("should return a status of 201, add game to games array successfully", async () => {
    const res = await request(server)
      .post("/games")
      .send({
        title: "Mario Kart",
        genre: "Racing video game",
        releaseYear: 1992
      })
      .set("Accept", "application/json");
    expect(res.status).toBe(201);
    expect(res.type).toBe("application/json");
    //check that the game has been added
    expect(res.body.length).toBe(1);
    const game = res.body.find(g => g.title === "Mario Kart");
    expect(game).toEqual({
      title: "Mario Kart",
      genre: "Racing video game",
      releaseYear: 1992,
      id: 1
    });
  });

  // adding the game twice to be sure it gets rejected
  it("should not allow to add a game with an existing title", async () => {
    await request(server)
      .post("/games")
      .send({
        title: "Mario Kart",
        genre: "Racing video game",
        releaseYear: 1992
      })
      .set("Accept", "application/json");
    const res = await request(server)
      .post("/games")
      .send({
        title: "Mario Kart",
        genre: "Racing video game",
        releaseYear: 1992
      })
      .set("Accept", "application/json");
    expect(res.status).toBe(405);
    expect(res.type).toBe("application/json");
    expect(res.body).toBe("A game with this title already exists");
  });
});

describe("GET /games", () => {
  it("should always return an array - empty if no games", async () => {
    const res = await request(server).get("/games");
    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body).toHaveLength(0);
  });
});

describe("GET /games/:id", () => {
  it("should return a status 404 if id invalid", async () => {
    Games.insert({
      title: "Mario Kart",
      genre: "Racing video game",
      releaseYear: 1992
    });
    const res = await request(server).get("/games/11");
    expect(res.status).toBe(404);
  });

  it("should return the right game with the id", async () => {
    Games.insert({
      title: "Mario Kart",
      genre: "Racing video game",
      releaseYear: 1992
    });
    Games.insert({
      title: "Pacman",
      genre: "Arcade",
      releaseYear: 1980
    });
    const res = await request(server).get("/games/1");
    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Mario Kart");
  });
});

describe("DELETE /games/:id", () => {
  it("should return a status of 404 and count as 0 if games doesn't exist", async () => {
    const res = await request(server).delete("/games/11");
    expect(res.status).toBe(404);
    expect(res.body).toBe(0);
  });

  it("should return a status of 200 and count of 1 if game deleted", async () => {
    Games.insert({
      title: "Mario Kart",
      genre: "Racing video game",
      releaseYear: 1992
    });
    Games.insert({
      title: "Pacman",
      genre: "Arcade",
      releaseYear: 1980
    });
    const res = await request(server).delete("/games/1");
    expect(res.status).toBe(200);
    expect(res.body).toBe(1);
    const games = Games.fetchAll();
    expect(games.length).toBe(1);
  });
});
