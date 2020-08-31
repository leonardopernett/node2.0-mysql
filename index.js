const app = require('./app');

require('./database').connect();
const main = async ()=>{
  await app.listen(app.get('port'))
  console.log('server no port 3000')
}

main()