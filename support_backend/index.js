const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongodb = require("./db/mongoose");
const handle = require("./handlers");
const route = require("./routes");
const auth = require("./middlewares/auth");

const app = express();
mongodb();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));
app.use("/", route.user);
// app.use(auth);

app.use((req, res, next) => {
  let err = new Error("not Found");
  err.status = 404;
  next(err);
});
app.use(handle.error);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started...");
});
