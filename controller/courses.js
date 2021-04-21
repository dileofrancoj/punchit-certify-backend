const { getList } = require("../models/courses");

const courses = async (req, res) => {
  try {
    const { id } = req;
    const data = await getList(id);
    res.json(data);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

module.exports = { courses };
