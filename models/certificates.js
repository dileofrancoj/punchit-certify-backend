// ?email="email@email.com"
const db = require("./../database/config");

const list = ({ email, id }) => {
  console.log(email);
  return db(`usuarios as u`)
    .join(`compra as c`, "c.id_usuario", "u.id")
    .join(`compra_producto as cp`, "c.id", "cp.id_compra")
    .join(`combinacion_producto as combProd`, "cp.idCombinacion", "combProd.id")
    .join(`producto as p`, "p.id", "combProd.id_producto")
    .where("u.mail", email)
    .andWhere("c.estado_pago", true)
    .select("u.nombre", "u.apellido", "p.nombre as curso");
};

module.exports = { list };
