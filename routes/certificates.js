const { Router } = require("express");
const router = new Router();
const { certificates } = require("./../controller/certificates");

router.get("/", certificates);

module.exports = router;
