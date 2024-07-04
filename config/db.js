// config/db.js
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const connection = mysql.createConnection({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function connectDatabase() {
  try {
    await new Promise((resolve, reject) => {
      connection.connect((err) => {
        if (err) {
          console.error('Erro ao conectar ao banco de dados:', err.stack);
          reject(err);
          return;
        }
        console.log('Conectado ao banco de dados como id ' + connection.threadId);
        resolve();
      });
    });
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error.message);
  }
}

connectDatabase();

module.exports = connection;

