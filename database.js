const {createPool} = require('mysql2/promise');

const connect = async ()=>{
    const pool = await createPool({
      host: '127.0.0.1',
      user: 'root',
      database: 'database_link',
      password:'Admin_09',
      connectionLimit: 10,
   })

   console.log('db is connected');
   return pool;
}

module.exports = {connect}