const request = require("supertest");

const server = require("./server.js");

let games = [
  {
    title: "Pacman", // required
    genre: "Arcade", // required
    releaseYear: 1980 // not required
  }
];

beforeEach(async () => {
  //reset the games list to initial list
  games = [
    {
      title: "Pacman",
      genre: "Arcade",
      releaseYear: 1980
    }
  ];
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
});
