const uuid = require("node-uuid");
const pdf = require("html-pdf");

const createHTMLCertificate = ({ fullName, courseName }) =>
  `<html>
    <head>
        <style type='text/css'>
            body, html {
                margin: 0;
                padding: 0;
            }
            body {
                color: black;
                display: table;
                font-family: Georgia, serif;
                font-size: 24px;
                text-align: center;
            }
            .container {
                border: 20px solid tan;
                width: 750px;
                height: 563px;
                display: table-cell;
                vertical-align: middle;
            }
            .logo {
                color: tan;
            }

            .marquee {
                color: tan;
                font-size: 48px;
                margin: 20px;
            }
            .assignment {
                margin: 20px;
            }
            .person {
                border-bottom: 2px solid black;
                font-size: 32px;
                font-style: italic;
                margin: 20px auto;
                width: 400px;
            }
            .reason {
                margin: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">
                An Organization
            </div>

            <div class="marquee">
                Certificate of Completion
            </div>

            <div class="assignment">
                This certificate is presented to
            </div>

            <div class="person">
                ${fullName}
            </div>

            <div class="reason">
                For deftly defying the laws of gravity<br/>
                and flying high
            </div>
        </div>
    </body>
</html>
    `;

const makePdf = (options) => {
  const pdfName = uuid();
  const html = createHTMLCertificate({
    fullName: options.nombre,
    courseName: options.curso,
  });
  pdf.create(html).toFile(`./certificates/${pdfName}.pdf`, (err, _) => {
    if (err) throw new Error("No se pudo crear el PDF");
  });

  return pdfName;
};

module.exports = { makePdf };