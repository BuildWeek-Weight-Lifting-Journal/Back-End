const request = require("supertest");
const server = require("../../index");

describe("exercise router", () => {
  describe("GET to api/exercises", () => {
    it("should return a 401 unauthorized when no token is provided", async () => {
      const expected = 401;
      let exercise = await request(server).get("/api/exercises");

      expect(exercise.status).toEqual(expected);
    });
  });
});