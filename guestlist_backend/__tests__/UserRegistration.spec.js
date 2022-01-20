import request from "supertest";
import { app } from "../src/app";

describe("User Registration", () => {
  it("returns 200 OK if the signup request is valid", () => {
    return request(app)
      .post("/api/v1/users")
      .send({
        username: "testuser",
        email: "testuser@mail.com",
        password: "test",
      })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  it("returns a success message if the signup request is valid", () => {
    return request(app)
      .post("/api/v1/users")
      .send({
        username: "testuser",
        email: "testuser@mail.com",
        password: "test",
      })
      .then((res) => {
        expect(res.body.message).toBe("User created");
      });
  });
});
