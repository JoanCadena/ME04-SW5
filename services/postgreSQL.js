const { Pool } = require("pg");
const config = require('../config')

class ServicioPG {
  constructor() {
    this.pool = new Pool({
      user: "postgres",
      host: "localhost",
      database: "ME04SW5",
      password: config.PASSWORD || '',
      port: 5432,
    });
  }

  async ejecutarSql(sql) {
    let respuesta = await this.pool.query(sql);
    return respuesta;
  }
}

module.exports = ServicioPG;