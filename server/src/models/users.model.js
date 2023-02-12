const UserSchema = require("./users.mongo");

async function PostUser(profile) {
  // const document = new UserSchema(user);
  // document.save();
  const user = {
    _id: profile.id,
    email: profile.emails[0].value,
    email_verified: profile.emails[0].verified,
    name: profile.name,
    picture: profile.photos[0].value,
  };
  await UserSchema.update(user, user, { upsert: true });
}

module.exports = { PostUser };
