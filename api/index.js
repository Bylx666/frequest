const http = require('http')
const frequest = require('../frequest')

const port = process.env.PORT || 2333
const host = process.env.HOSTNAME || "localhost"

const app = http.createServer((Req,Res)=>{
  let url = new URL(Req.url,`http://${Req.headers.host}`)
  console.log(url.pathname+url.search)

  if(url.pathname+url.search=='/favicon.ico') {
    url.searchParams.set('url','https://freq.ller.cf/favicon.png')
  }

  const getParam = (param) => url.searchParams.get(param)
  let req = {
    url: getParam('url') || null,
    method: getParam('method') || 'get',
    body: getParam('body') || '',
    headers: getParam('headers') || {},
    advanced: getParam('advanced') || {}
  }

  let one = 0
  frequest(
    req.url,
    {
      method: req.method, 
      body: req.body, 
      headers: req.headers, 
      advanced: req.advanced
    },
    (e)=>{ 
      if(one==0) {
        Res.writeHead(parseInt(e.statusCode),{
          'allow-control-access-origin': '*'
        })
        one++
      }
      Res.write(e.body) },
    ()=>{ Res.end() }
  )

}).listen(port)

console.log(`server in http://${host}:${port}`)

module.exports = app