require("dotenv").config();
const passport = require("passport");
const authRoutes = require("express").Router();
const { PostUser } = require("../models/users.model");
const { Strategy: GoogleStartegy } = require("passport-google-oauth20");

const config = {
  clientID: process.env.ID_CLIENT,
  clientSecret: process.env.CLIENT_SECRET,
};

const AUTH_OPTIONS = {
  callbackURL: `https://localhost:${process.env.PORT}/auth/google/callback`,
  clientID: config.clientID,
  clientSecret: config.clientSecret,
};

async function verifyCallback(accessToken, refreshToken, profile, done) {
  await PostUser(profile);
  done(null, profile.id);
}
passport.use(new GoogleStartegy(AUTH_OPTIONS, verifyCallback));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

function checkLoggedIn(req, res, next) {
  const isLoggedin = req.isAuthenticated() && req.user;
  if (!isLoggedin)
    return res.json({
      message: "You have to be logged in",
      status: 403,
      errorTitle: "Forbiddent",
    });
  next();
}

authRoutes.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

authRoutes.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/tasks",
    failureRedirect: "/failures",
    session: false,
  })
);

authRoutes.get("/logout", function (req, res) {
  req.logout();
  return res.redirect("/");
});

module.exports = { checkLoggedIn, authRoutes };
