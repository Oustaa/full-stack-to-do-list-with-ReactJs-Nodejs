const { Schema, model } = require("mongoose");

const tasksSchema = new Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  duration: { type: Number, default: null },
  doneBy: { type: Date, default: null },
  every: { type: String, default: null },
  done: { type: Boolean, default: false },
  deleted: { type: Boolean, default: false },
});

module.exports = model("task", tasksSchema);
