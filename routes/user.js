const { Router } = require("express");
const { check } = require("express-validator");
const route = Router();
const {
  getUser,
  postUser,
  deleteUser,
  putUser,
} = require("../controllers/user");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  esRolValido,
  esEmailValido,
  existeUsuarioPorId,
} = require("../helpers/db-validators");
//const bodyParser = require("body-parser");

route.get("/", getUser);

//route.post("/", bodyParser.json(), postUser);
route.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe tener más de 6 letras").isLength({
      min: 6,
    }),
    check("correo", "El correo no es válido").isEmail(),
    check("correo").custom(esEmailValido),
    //check('rol','No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  postUser
);

route.delete(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  deleteUser
);

route.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  putUser
);

module.exports = route;
