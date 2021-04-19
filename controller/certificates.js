const { list } = require("../models/certificates");
const { makePdf } = require("../services/pdfGenerator");
const certificates = async (req, res) => {
  try {
    const { query } = req;
    const { email } = query;
    const [data] = await list({ email });

    makePdf(data);
    const info = { ...data, url: "bucket.com.ar/certificate.pdf" };
    res.json(info);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

module.exports = { certificates };
