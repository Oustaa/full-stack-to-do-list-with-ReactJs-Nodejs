const {
  tasks,
  getTasks,
  postTask,
  putTask,
  deleteTask,
} = require("../models/tasks.model");

async function httpGetTasks(req, res) {
  try {
    await getTasks();
    return await res.status(201).json(tasks);
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
    (task.every === "day" && !task.duration)
  )
    return res.status(400).json({
      error_message: "Missing or empty required filed",
    });

  try {
    const appendedTask = await postTask(task);
    return res.status(201).json(appendedTask);
  } catch (err) {
    return res.status(500);
  }
}

async function httpPutTask(req, res) {
  const task = req.body;
  const newTask = await putTask(task);
  res.status(200).json(newTask);
}

async function httpDeleteTask(req, res) {
  const taskId = +req.params.id;
  deleteTask(taskId);
  res.status(200).json({ deletd_id: taskId });
}

module.exports = {
  httpGetTasks,
  httpPostTask,
  httpPutTask,
  httpDeleteTask,
};
