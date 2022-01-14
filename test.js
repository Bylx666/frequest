var http = require('http');

var port = process.env.PORT || 8088;
const server = http.createServer((sreq,sres)=>{
  sres.writeHead(200, {
    'content-type':'application/json'
  })

  var resBody
  let reqOptions = {
    method: "GET",
    hostname: "api-takumi.mihoyo.com",
    port: "443",
    path: "/game_record/card/wapi/getGameRecordCard",
    headers: {
      'Content-Type': 'application/json'
      // ...HEADERS,
      // 'DS': getDS()
    }
  }
  let req = require('https').request(reqOptions,(res)=>{
    res.setEncoding('utf8');
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.on('data',(reqChunk)=>{
      resBody=reqChunk
      console.log(reqChunk)
      sres.write(resBody)
      sres.end()
    })
  });
  req.end();

  sres.on('error',(e)=>{
    console.error("233"+e)
  })
}
).listen(port);

console.log('Server running at http://localhost:'+port+'/');

module.exports = server