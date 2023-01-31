const express = require("express");

const {
  httpGetTasks,
  httpPostTask,
  httpPutTask,
  httpDeleteTask,
  httpGetUpComing,
} = require("./tasks.controller");

const tasksRouter = express.Router();

tasksRouter.get("/", httpGetTasks);
tasksRouter.post("/", httpPostTask);
tasksRouter.put("/", httpPutTask);
tasksRouter.delete("/:id", httpDeleteTask);
tasksRouter.get("/upComing", httpGetUpComing);

module.exports = tasksRouter;
