const http = require("http");

const app = require("./app");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Start listening on port ${PORT}`);
});
