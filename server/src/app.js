require("dotenv").config();
const helmet = require("helmet");
const express = require("express");
const passport = require("passport");
const cookieSession = require("cookie-session");
const tasksRouter = require("./routes/tasks.route");
const { authRoutes, checkLoggedIn } = require("./services/authentication");
const path = require("path");
const app = express();

app.use((req, res, next) => {
  console.log(`${req.url} ${req.method}`);
  next();
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(helmet());
app.use(
  cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY_1, process.env.COOKIE_KEY_2],
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/tasks", checkLoggedIn, tasksRouter);
app.get("/", function (req, res) {
  return;
});
app.get("/failures", function (req, res) {
  res.status(403).send({
    message: "You must log in",
    success: false,
  });
});

module.exports = app;
