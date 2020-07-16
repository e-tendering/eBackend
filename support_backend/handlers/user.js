const db = require("../models");
const auth = require("../middlewares/auth");

//user login
exports.login = async (req, res, next) => {
  try {
    const user = await db.User.findByCredentials(
      req.body.email,
      req.body.password
    );
    console.log(user);
    const token = await user.authToken();
    res.send({ user, token });
  } catch (error) {
    console.log(error);
    return next({ status: 400, message: "Invalid userName/password" });
  }
};

//user register
exports.register = async (req, res, next) => {
  const user = new db.User(req.body);
  try {
    await user.save();
    const token = user.authToken();
    res.status(201).send({ user, token });
  } catch (e) {
    //  res.status(400).send(e);
    return next({ status: 400, message: e });
  }
};
