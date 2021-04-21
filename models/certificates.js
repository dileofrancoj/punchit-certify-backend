const db = require("../database/config");
const { getList: getCourse } = require("./courses");

const { T_CERTIFICADOS } = require("./../config/tables");

const single = (idUser, idProd) => getCourse(idUser, idProd);
const create = (obj) => db(T_CERTIFICADOS).insert(obj);
const getCertificateByUserAndCourse = (idUser, idCourse) =>
  db(T_CERTIFICADOS).select("uid").where({ idUser, idCourse });

module.exports = { single, create, getCertificateByUserAndCourse };
