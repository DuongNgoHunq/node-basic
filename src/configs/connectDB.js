// get the client

import mysql from 'mysql2/promise';
// create the connection to database
// const connection = mysql.createConnection({
  const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'nodejsbasic'
});
// const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'test'});
// // simple query




export default pool;
