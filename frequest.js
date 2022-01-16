const http = require('http')
const https = require('https')

/** 
 * ***
 * Requesting for a link. 
 * 'I' prefix means Inputted
 * 
 * @param {string} Iurl requests valid link including "http://" or "https://"
 * @param {object} Ioptions 
 * write only `{}` to make these all default value.

  {
  
    `method`: requesting method || `'get'`,

    `body`: request's body || `''`,

    `headers`: using headers || `{}`,

    `advanced`: advanced options of *https.request.argument[1] - 
      options https://nodejs.org/api/http.html#httprequestoptions-callback* || `{}`

  }
 * @param {(e:object)=>void} callbackOnData 
  callback when on data, unlimited times.

  For example `function (e) { console.log(e.body) }` or `(e) => { console.log(e.body) }`

  e = { body : `requested raw` , response : `http.incomingMessage` , statusCode : `response's status`}
 * @param {void} callbackOnEnd 
  callback when on end, only once.

  `function () { console.log('No data anymore~') }`

*/
function frequest (
  Iurl,
  Ioptions,
  callbackOnData = function (e) { return e },
  callbackOnEnd = function () { return 0 }
) {
  const err = (e)=> {
    const E = {
      body: JSON.stringify({'failed to request': `${e}`}),
      response: {message:'寄'},
      statusCode: 403
    }
    callbackOnData(E);
    callbackOnEnd();
  }

  let url
  try{
    url = new URL(Iurl)
  } catch(e){
    return err(e)
  }
// Check And Default again to make this modularize
  let options = {
    method: Ioptions.method || 'get',
    body: Ioptions.body || '',
    headers: Ioptions.headers || {},
    advanced: Ioptions.advanced || {}
  }

  const ReqOptions = {
    method: options.method,
    hostname: url.hostname,
    port: url.port,
    path: url.pathname+url.search,
    headers: {
      ...options.headers
    },
    ...options.advanced
  }

  try {
    let using
    if(url.protocol == 'https:') using = https
    else using = http
    let aReq = using.request(ReqOptions,(Resp)=>{
      Resp.on('error',(e)=>{
        return err(e)
      })
      Resp.on('data',(chunk)=>{
        let e = {
          body : chunk,
          response : Resp,
          statusCode: Resp.statusCode
        }
        callbackOnData(e)
      })
      Resp.on('end',()=>{ callbackOnEnd() })
    })
    if(options.body != '') aReq.write(options.body)
    aReq.end()
  } catch (e) {
    return err(e)
  }
}

module.exports = frequest