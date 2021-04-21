const {
  single,
  create,
  getCertificateByUserAndCourse,
} = require("../models/certificates");
const { makePdf } = require("../services/pdfGenerator");

const createPDFCertificate = async (id, idCourse) => {
  try {
    const [data] = await single(id, { "PR.ID": idCourse });
    const uidPDF = await makePdf(data);

    return uidPDF;
  } catch (e) {
    throw e;
  }
};

const certificates = async (req, res) => {
  try {
    const { id, params } = req;
    const { id: idCourse } = params;
    const getCertificate = await getCertificateByUserAndCourse(id, idCourse);
    console.log(getCertificate);
    if (getCertificate.length) {
      console.log("otra vez acá");
      uid = getCertificate[0].uid;
      const info = { url: `${process.env.S3_DOMAIN}/${uid}.pdf` };
      return res.json(info);
    }
    const uidPDF = await createPDFCertificate(id, idCourse);
    const certificateObject = {
      idCourse,
      idUser: id,
      uid: uidPDF,
    };
    await create(certificateObject);
    const info = { url: `${process.env.S3_DOMAIN}/${uidPDF}.pdf` };
    res.json(info);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

module.exports = { certificates };
