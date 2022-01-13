const express = require('express');
const cors = require('cors')

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.routes();
    this.midlewares();
  }

  midlewares(){
    //lectura y parseo del body
    this.app.use(express.json())
    this.app.use(cors());
  }

  routes(){
    this.app.use('/api/user',require('../routes/user'))
  }

  listener(){
    this.app.listen(this.port,()=>{
      console.log("Servidor corriendo en puerto ", this.port)
    })
  }
}

module.exports = Server