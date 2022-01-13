const {response,request} = require('express');

const getUser = (req, res = response) => {
  res.json({
    msg: "get - API controlador"
  })
}

const postUser = (req = request, res = response) => {
  const {id} = req.params
  const {page = 1, limit = 10} = req.query
  res.json({
    msg: "post - API controlador",
    id,
    page,
    limit
  })
}

const deleteUser = (req, res = response) => {
  res.json({
    msg: "delete - API controlador"
  })
}

const putUser = (req, res = response) => {
  res.json({
    msg: "put - API controlador"
  })
}

module.exports = {
  getUser,
  postUser,
  deleteUser,
  putUser
}