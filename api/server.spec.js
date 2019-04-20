const request = require("supertest");

const server = require("./server.js");

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
    expect(res.body.length).toBe(2);
    const game = res.body.find(g => g.title === "Mario Kart");
    expect(game).toEqual({
      title: "Mario Kart",
      genre: "Racing video game",
      releaseYear: 1992
    });
  });
});

describe("GET /games", () => {
  it("should always return an array", async () => {
    const res = await request(server).get("/games");
    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body).toBeInstanceOf(Array);
  });
});
