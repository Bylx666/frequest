var http = require('http');
var frequest = require('./frequest')

var port = process.env.PORT || 8088;
const server = http.createServer((Req,Res)=>{
  Res.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'content-type':'image/jpeg'
  })

  frequest('https://ller.cf/imgs/cover/bokuraIma.jpg',{},(e)=>{
    Res.write(e.body)
  },()=>{
    Res.end()
  })

  Res.on('error',(e)=>{
    console.error(e)
  })
}
).listen(port);

console.log('Server running at http://localhost:'+port+'/');

module.exports = server