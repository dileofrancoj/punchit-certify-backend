// ?email="email@email.com"
const db = require("./../database/config");
const {
  T_COMPRA,
  T_COMPRA_PROD,
  T_PROD,
  T_CATEGORIA,
  T_ATTR,
  T_ATTR_VALOR,
  T_COMBINACION,
  T_STOCK_PROD,
  T_PROD_IMG,
  T_USUARIOS,
} = require("./../config/tables");

const getProducts = (idUser, conditions) =>
  db(`${T_PROD} as PR`)
    .join(`${T_CATEGORIA} as CAT`, "PR.id_categoria", "CAT.id")
    .join(`${T_STOCK_PROD} as ST`, "ST.id_producto", "PR.id")
    .join(`${T_COMPRA_PROD} as CPROD`, "CPROD.idCombinacion", "ST.id")
    .join(`${T_COMPRA} as CP`, "CP.id", "CPROD.id_compra")
    .join(`${T_USUARIOS} as U`, "U.id", "CP.id_usuario")
    .where({
      "U.id": idUser,
      "CP.estado_pago": 1,
      "CAT.id": 1,
      ...conditions,
    })
    .select(
      "U.nombre as nombre",
      "PR.id as ID_prod",
      "PR.nombre as prod_name",
      "PR.descripcion as prod_descrip"
    )
    .orderBy("PR.id", "desc");

const getAttributes = (idComb) =>
  db(`${T_COMBINACION} as PAT`)
    .join(`${T_ATTR} as AT`, "PAT.id_atributo", "AT.id")
    .join(`${T_ATTR_VALOR} as ATV`, "PAT.id_atributo_valor", "ATV.id")
    .where({ "PAT.id_comb_prod": idComb })
    .select(
      "PAT.id as ID_pr_attr",
      "AT.id as ID_attr",
      "AT.nombre as attr_name",
      "ATV.id as ID_value",
      "ATV.valor as value_name"
    );

const getImages = async (id) =>
  db(`${T_PROD_IMG} as PI`)
    .where({ eliminado: false, id_producto: id })
    .select("PI.id as ID_img", "valor");

const getItems = async (idUser, conditions) => {
  const prods = await getProducts(idUser, conditions);
  const pr_final = prods.map(async (p) => {
    const [img_list] = await getImages(p.ID_prod);
    const attr_list = await getAttributes(p.ID_prod).then(
      (attr_list) => attr_list
    );
    return { ...p, attr_list, img_list };
  });
  return Promise.all(pr_final);
};

const getList = (idUser, conditions = {}) => getItems(idUser, conditions);

module.exports = { getList };
