const Role = require("../models/role");
const Usuario = require("../models/usuario");

const esRolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la BD`);
  }
};

const esEmailValido = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    /*return res.status(400).json({
      msg: 'Este correo ya está registrado'
    })*/
    throw new Error(`El correo ${correo} ya está registrado`);
  }
};

const existeUsuarioPorId = async (id = "") => {
  const existeUsuario = await Usuario.findOne({ id });
  if (!existeUsuario) {
    /*return res.status(400).json({
      msg: 'Este correo ya está registrado'
    })*/
    throw new Error(`El id ${id} no está registrado`);
  }
};

module.exports = {
  esRolValido,
  esEmailValido,
  existeUsuarioPorId,
};
