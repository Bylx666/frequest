const https = require('https')
const http = require('http')
const frequest = require('./frequest')

const port = process.env.PORT || 2333
const host = process.env.HOSTNAME || "localhost"

const app = http.createServer((Req,Res)=>{
  if(Req.url=='/favicon.ico') return

  Res.on('error',(e)=>{Res.write(JSON.stringify({err : `${e}`}))})
  Res.setHeader('content-type','application/json')

  let QSs = new URL(Req.url,`http://${Req.headers.host}`)

  const getParam = (param) => QSs.searchParams.get(param)

  frequest('http://nodejs.cn/api/http.html#httprequesturl-options-callback')

}).listen(port)

console.log(`server in http://${host}:${port}`)

module.exports = app