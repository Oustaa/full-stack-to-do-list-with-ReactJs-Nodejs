require("dotenv").config();
const http = require("http");
const mongoose = require("mongoose");

const DB_URL = process.env.MONGO_URL;
const app = require("./app");

const PORT = process.env.PORT || 8000;

mongoose.set("strictQuery", false);

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});
const server = http.createServer(app);

async function startServer() {
  await mongoose.connect(DB_URL);
  server.listen(PORT, () => {
    console.log(`Start listening on port ${PORT}`);
  });
}

startServer();
