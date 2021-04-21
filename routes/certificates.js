const { Router } = require("express");
const router = new Router();

const { certificates } = require("./../controller/certificates");
const { verifyAuthentication } = require("../middlewares/auth");

router.get("/:id", verifyAuthentication, certificates);

module.exports = router;
