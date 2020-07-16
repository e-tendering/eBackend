const router = require("express").Router();
const handle = require("../handlers");
const auth = require("../middlewares/auth");
router.post("/login", handle.login);
router.post("/register", handle.register);

module.exports = router;
