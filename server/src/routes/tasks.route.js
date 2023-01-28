const express = require("express");

const {
  httpGetTasks,
  httpPostTask,
  httpPutTask,
  httpDeleteTask,
} = require("./tasks.controller");

const tasksRouter = express.Router();

tasksRouter.get("/", httpGetTasks);
tasksRouter.post("/", httpPostTask);
tasksRouter.put("/", httpPutTask);
tasksRouter.delete("/:id", httpDeleteTask);

module.exports = tasksRouter;
