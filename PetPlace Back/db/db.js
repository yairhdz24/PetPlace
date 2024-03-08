// const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'yairhdz24',
//   host: 'localhost',
//   database: 'alitas_lebro',
//   password: 'yairhdz24',
//   port: 5432,
// });

// module.exports = pool;
const { Pool } = require('pg');

const pool = new Pool({
  user: 'doadmin', // usuario de digital ocean
  host: 'db-postgresql-pet-place-do-user-15684287-0.c.db.ondigitalocean.com', // host de la base de datos
  database: 'defaultdb', // nombre de la bd
  password: 'AVNS_0NPsl0fNS_JrUBydmH5', // Reemplaza con tu contraseña
  port: 25060, 
  ssl: {
    rejectUnauthorized: false 
  }
});

module.exports = pool;
