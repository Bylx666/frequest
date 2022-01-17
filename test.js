var http = require('http');
var frequest = require('./frequest')

var port = process.env.PORT || 8088;
const server = http.createServer((Req,Res)=>{
  Res.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
  })

  frequest('https%3A%2F%2Fller.cf%2Fimgs%2Fcover%2FthankYouFriend.jpg',{},(e)=>{
    Res.write(e.body)
  },()=>{
    Res.end()
  })
}
).listen(port);

console.log('Server running at http://localhost:'+port+'/');

module.exports = server