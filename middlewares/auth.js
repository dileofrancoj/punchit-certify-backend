const api = require("../api");

const verifyAuthentication = async (req, res, next) => {
  const { data } = await api.get("/auth/verify", {
    headers: {
      Authorization: req.headers.authorization,
    },
  });
  if (data.authenticated) {
    req.id = data.id;
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
};

module.exports = { verifyAuthentication };
