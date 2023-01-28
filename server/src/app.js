const express = require("express");

const tasksRouter = require("./routes/tasks.route");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.url} ${req.method}`);
  next();
});

app.use("/tasks", tasksRouter);

module.exports = app;
