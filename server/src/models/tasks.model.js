const fs = require("fs");
const { join } = require("path");
const { parse } = require("csv-parse");

const taskModel = require("./tasks.mongo");

const FILE_PATH = join(__dirname, "..", "data", "tasks.csv");

async function getTasks({ skip, limit }) {
  return await taskModel
    .find({}, { __v: 0 })
    .skip(skip)
    .limit(limit)
    .sort({ _id: 1 });
}

async function postTask(task) {
  return taskModel.updateOne(task, task, { upsert: true });
}

async function putTask(updatedTask) {
  return await taskModel.updateOne({ _id: updatedTask._id }, updatedTask);
}

async function deleteTask(id) {
  /* ---------------- Delete Permanently ---------------- */
  // return await taskModel.deleteOne({ _id: id });
  return await taskModel.updateOne({ _id: id }, { deleted: true });
}

async function getUpComing() {
  const upComingTasks = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(FILE_PATH)
      .pipe(parse({ columns: true }))
      .on("data", (data) => {
        if (
          data.type === "doneBy" &&
          new Date(+data.doneBy).valueOf() > new Date().valueOf()
        ) {
          console.log("Found match");
          upComingTasks.push(data);
        }
      })
      .on("error", (err) => {
        reject(err);
      })
      .on("end", () => {
        resolve(upComingTasks);
      });
  });
}

module.exports = {
  getTasks,
  postTask,
  putTask,
  deleteTask,
  getUpComing,
};
