const { Router } = require("express");
const router = new Router();

const { verifyAuthentication } = require("./../middlewares/auth");
const { courses } = require("./../controller/courses");

router.get("/", verifyAuthentication, courses);

module.exports = router;
