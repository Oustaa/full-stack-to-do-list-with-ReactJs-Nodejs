const {
  getTasks,
  postTask,
  putTask,
  deleteTask,
  getUpComing,
} = require("../models/tasks.model");

const { getQueryParam } = require("../services/pagination");

async function httpGetTasks(req, res) {
  const queryParam = await getQueryParam(req.query);

  try {
    return await res.status(201).json(await getTasks(queryParam));
  } catch (error) {
    return res.status(400).json({ error_message: error.message });
  }
}

async function httpPostTask(req, res) {
  const task = req.body;

  if (
    !task.title ||
    !task.type ||
    (task.type === "every" && !task.every) ||
    (task.every === "day" && !task.duration) ||
    (task.type === "doneBy" && !task.doneBy)
  )
    return res.status(400).json({
      error_message: "Missing or empty required filed",
    });

  try {
    const { acknowledged, upsertedCount, upsertedId } = await postTask(task);
    if (acknowledged && upsertedCount === 1)
      return res.status(201).json({ error: null, upsertedId });
  } catch (err) {
    return res.status(500);
  }
}

async function httpPutTask(req, res) {
  const task = req.body;
  const updateInfo = await putTask(task);
  if (updateInfo.acknowledged)
    return res
      .status(200)
      .json({ error: null, errorMessage: null, success: true });
  else
    return res.status(400).json({
      error: true,
      errorMessage: "Document was not updated please try again later",
      success: true,
    });
}

async function httpDeleteTask(req, res) {
  try {
    const taskId = req.params.id;

    await deleteTask(taskId);
    return res
      .status(200)
      .json({ error: null, errorMessage: null, deleted_id: taskId });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, errorMessage: error.message, deleted_id: taskId });
  }
}

async function httpGetUpComing(req, res) {
  const upComingTasks = await getUpComing();

  res.status(200).json(upComingTasks);
}

module.exports = {
  httpGetTasks,
  httpPostTask,
  httpPutTask,
  httpDeleteTask,
  httpGetUpComing,
};
