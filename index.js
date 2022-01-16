const http = require('http')
const frequest = require('./frequest')
const fs = require('fs')
const path = require('path')

const port = process.env.PORT || 2333
const host = process.env.HOSTNAME || "localhost"



const app = http.createServer((Req,Res)=>{

  /**
   * 
   * @param {string} relativePath for example `./static/favicon.ico`
   * @param {string} fileMine for example `application/json`
   */
  const getStaticFile = (relativePath,fileMine) => {
    fs.readFileSync(path.resolve(__dirname,relativePath),(err,data)=>{
      if(err) {
        Res.writeHead(404,{'content-type': 'text/plain'})
        Res.write(err.message)
        Res.end()
      }
      else {
        Res.writeHead(200,{'content-type': fileMine})
        Res.write(data)
        Res.end()
      }
    })
  }

  if(Req.url=='/favicon.ico') {
    getStaticFile('static/favicon.png','image/png')
    return
  }

  let url = new URL(Req.url,`http://${Req.headers.host}`)
  console.log(url.pathname+url.search)
  if(url.pathname+url.search=='/') {
    getStaticFile('static/index.html','text/html')
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