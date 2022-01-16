const http = require('http')
const frequest = require('./frequest')
const fs = require('fs')

const port = process.env.PORT || 2333
const host = process.env.HOSTNAME || "localhost"

const app = http.createServer((Req,Res)=>{
  if(Req.url=='/favicon.ico') return

  Res.setHeader('Access-Control-Allow-Origin','*')

  let url = new URL(Req.url,`http://${Req.headers.host}`)
  console.log(url.pathname+url.search)
  if(url.pathname+url.search=='/') {
    fs.readFile('./static/home.html',(err,data)=>{
      if(err) {
        Res.writeHead(404,{'content-type': 'text/plain'})
        Res.write(err.message)
      }
      else {
        Res.writeHead(200,{'content-type': 'text/html'})
        Res.write(data)
      }
      Res.end()
    })
    return
  }

  const getParam = (param) => url.searchParams.get(param)
  let req = {
    url: getParam('url') || null,
    method: getParam('method') || 'get',
    body: getParam('body') || '',
    headers: getParam('headers') || {},
    advanced: getParam('advanced') || {}
  }

  frequest(
    req.url,
    {
      method: req.method, 
      body: req.body, 
      headers: req.headers, 
      advanced: req.advanced
    },
    (e)=>{ Res.writeHead(e.statusCode); Res.write(e.body) },
    ()=>{ Res.end() }
  )

}).listen(port)

console.log(`server in http://${host}:${port}`)

module.exports = app