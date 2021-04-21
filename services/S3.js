const fs = require("fs");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
});

const putObjectWrapper = (params) => {
  return new Promise((resolve, reject) => {
    s3.putObject(params, (err, result) => {
      if (err) reject(err);
      if (result) resolve(result);
    });
  });
};

const upload = async (file) => {
  const s3Params = {
    Bucket: process.env.bucketName,
    Key: `images/${file}.pdf`,
    Body: fs.readFileSync(`./public/certificates/${file}.pdf`),
    ContentType: "application/pdf",
    ACL: "public-read",
  };
  await putObjectWrapper(s3Params);
  await fs.unlink(`./public/certificates/${file}.pdf`, (err) => {
    if (err) throw new Error("Ocurrió un error al borrar un archivo");
  });
};

module.exports = { upload };
