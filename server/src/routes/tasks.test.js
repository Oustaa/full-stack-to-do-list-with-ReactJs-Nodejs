const request = require("supertest");
const app = require("../app");

describe("GET /tasks", () => {
  it("should response with a 200 status code", () => {
    request(app).get("/tasks").expect(200);
  });
});

describe("GET /tasks/upcoming", () => {
  request(app).get("/tasks/upcoming").expect(200);
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
    title: "task number somthing",
    duration: 3600,
    every: "day",
    doneBy: undefined,
  };
  const taskDataEmptyInput = {
    title: "task number somthing",
    duration: 3600,
    type: "",
    every: "day",
    doneBy: undefined,
  };

  it("should response with a 201(CREATED) status code, and an object contening an i property", () => {
    const response = request(app).get("/tasks").send(taskData).expect(201);
    expect(response.body).toHaveProperty("id");
  });

  it("should catch mising required field", async () => {
    const response = await request(app)
      .post("/tasks")
      .send(taskDataMissingInput)
      .expect(400);

    expect(response.body).toMatchObject({
      error_message: "Missing required field",
    });
  });

  it("should catch empty required field", async () => {
    const response = await request(app)
      .post("/tasks")
      .send(taskDataEmptyInput)
      .expect(400);

    expect(response.body).toMatchObject({
      error_message: "A required field is empty",
    });
  });
});

describe("DELETE /tasks/:id", async () => {
  const response = await request(app)
    .delete("/tasks/5")
    .expect(200)
    .expect("Content-Type", "aplication/json");

  expect(response.body).toHaveProperty("deleted_id");
});

// describe("PUT /tasks/:id", async () => {
//   const response = await request(app)
//     .put("/tasks/5")
//     .expect(200)
//     .expect("Content-Type", "aplication/json");

//   expect(response.body).toHaveProperty("deleted_id");
// });
