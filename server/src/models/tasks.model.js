const fs = require("fs");
const { join } = require("path");
const { parse } = require("csv-parse");

const FILE_PATH = join(__dirname, "..", "data", "tasks.csv");
const FILE_HEADERS = "id,title,type,every,duration,doneBy,completed\n";

const tasks = [];

function dataToString({ id, title, type, every, duration, doneBy, completed }) {
  return `${id},${title},${type},${every},${duration},${new Date(
    doneBy
  ).valueOf()},${completed}\n`;
}

function updateCsvFile(data) {
  let fileContent = data.reduce(
    (prev, next) => prev + dataToString(next),
    FILE_HEADERS
  );

  fs.appendFile(FILE_PATH, fileContent, { flag: "w" }, () => {});
}

function getTasks() {
  tasks.length = 0;
  return new Promise((resolve, reject) => {
    fs.createReadStream(FILE_PATH)
      .pipe(parse({ columns: true }))
      .on("data", (data) => {
        tasks.push({ ...data, id: +data.id });
      })
      .on("error", (err) => {
        reject(err);
      })
      .on("end", () => {
        resolve(tasks);
      });
  });
}

async function postTask(task) {
  //   get real time tasks
  await getTasks();

  const id = Math.max(...tasks.map((task) => task.id)) + 1;
  //   add new task
  await fs.appendFile(
    FILE_PATH,
    dataToString(Object.assign(task, { id, completed: false })),
    { flag: "a" },
    () => {}
  );

  return await task;
}

async function putTask(updatedTask) {
  await getTasks();

  const updatedTasks = await tasks.map((task) => {
    if (Number(updatedTask?.id) === Number(task.id)) return updatedTask;
    return task;
  });

  await updateCsvFile(updatedTasks);

  return await updatedTasks.find((task) => +task.id === +updatedTask.id);
}

async function deleteTask(id) {
  await getTasks();
  const updatedTasks = await tasks.filter((task) => +task.id !== id);
  updateCsvFile(updatedTasks);
}

module.exports = { tasks, getTasks, postTask, putTask, deleteTask };
