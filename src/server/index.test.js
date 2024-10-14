const request = require("supertest");
const app = require("./index");
const axios = require("axios");
jest.mock("axios");

describe("POST /api", () => {
  it("should return 400 if no URL is provided", async () => {
    const response = await request(app).post("/api").send({});
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("No URL provided");
  });

});
