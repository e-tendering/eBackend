// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   if (req.headers["authorization"]) {
//     const token = req.headers["authorization"].split(" ")[1];

//     jwt.verify(token, "SOMERANDOMSTRING", (err, decoded) => {
//       if (err) {
//         next(Error("Failed to Authenticate token"));
//       } else {
//         req.decoded = decoded;
//         next();
//       }
//     });
//   } else {
//     next(Error("Please Login again"));
//   }
// };

const jwt = require("jsonwebtoken");
const db = require("../models");
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const decode = jwt.verify(token, "myApp");
    const user = await db.User.findOne({
      _id: decode._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "please authenticate" });
  }
};

module.exports = auth;
