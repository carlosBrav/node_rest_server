const express = require('express');
const cors = require('cors')
const { dbConnection } = require("../database/config");
const bodyParser = require("body-parser");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.midlewares();
    this.routes();
    this.connectDB();
  }

  midlewares() {
    //lectura y parseo del body
    this.app.use(bodyParser.json());
    this.app.use(cors());
  }

  async connectDB() {
    await dbConnection();
  }

  routes() {
    this.app.use("/api/user", require("../routes/user"));
  }

  listener() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto ", this.port);
    });
  }
}

module.exports = Server