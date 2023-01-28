const request = require("supertest");
const app = require("../app");

describe("GET /tasks", () => {
  it("should response with a 200 status code", () => {
    request(app).get("/tasks").expect(200);
  });
});

describe("GET /tasks/upcoming", () => {
  request(app).get("/tasks/upcoming").expect(404);
});

describe("POST /tasks", () => {
  const taskData = {
    title: "task number somthing",
    duration: 3600,
    type: "every",
    every: "day",
    doneBy: undefined,
  };
  const taskDataMissingInput = {
    title: "",
    duration: 3600,
    every: "day",
    doneBy: undefined,
    type: "",
  };

  it("should response with a 201(CREATED) status code, and an object contening an id property", async () => {
    const response = await request(app)
      .post("/tasks")
      .send(taskData)
      .expect(201);
    console.log(response.body);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("completed");
  });

  it("should catch mising or empty required field", async () => {
    const response = await request(app)
      .post("/tasks")
      .send(taskDataMissingInput)
      .expect(400);

    expect(response.body).toMatchObject({
      error_message: "Missing or empty required filed",
    });
  });
});

describe("DELETE /tasks/:id", () => {
  it("should delete task with a giving id", async () => {
    const response = await request(app)
      .delete("/tasks/1")
      .expect(200)
      .expect("Content-Type", "aplication/json");

    expect(response.body).toHaveProperty("deleted_id");
  });
});

// describe("PUT /tasks/:id", async () => {
//   const response = await request(app)
//     .put("/tasks/5")
//     .expect(200)
//     .expect("Content-Type", "aplication/json");

//   expect(response.body).toHaveProperty("deleted_id");
// });
