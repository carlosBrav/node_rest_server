const { response, request } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");

const getUser = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };
  // const usuarios = await Usuario.find(query)
  //   .skip(Number(desde))
  //   .limit(Number(limite));
  // const total = await Usuario.count(query);
  const [total, usuarios] = await Promise.all([
    Usuario.count(query),
    Usuario.find(query)
    .skip(Number(desde))
    .limit(Number(limite))
  ])
  res.json({
    msg: "get - API controlador",
    total,
    usuarios,
  });
};

const postUser = async (req = request, res = response) => {
  //const {id} = req.params
  //const {page = 1, limit = 10} = req.query
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);
  await usuario.save();
  res.json({
    msg: "post - API controlador",
    usuario,
  });
};

const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;
  //const usuario = await Usuario.findByIdAndDelete(id);
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
  res.json(usuario);
};

const putUser = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;
  if (password) {
    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(password, salt);
  }
  const usuario = await Usuario.findByIdAndUpdate(id, resto);
  res.json({
    msg: "put - API controlador",
    usuario,
  });
};

module.exports = {
  getUser,
  postUser,
  deleteUser,
  putUser,
};
