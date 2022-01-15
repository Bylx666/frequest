const http = require('http')
const https = require('https')

const err = (e)=> JSON.stringify({err : `${e}`})

/** 
 * Requesting for a link
 * 
 * 'I' prefix means Inputted
 * @param {String} Iurl requests valid link including "http://" or "https://"
 * @param {Object} Ioptions 
 * write only `{}` to make these all default value.

  {
  
    `method` {String}: requesting method || `'get'`,

    `body`: request's body || `''`,

    `headers`: using headers || `{}`,

    `advanced`: advanced options of *https.request.argument[1] - 
      options https://nodejs.org/api/http.html#httprequestoptions-callback* || `{}`

  }
 * @param {Function} callback function (e) { ... }

  e = { body : `requested raw` , response : `http.incomingMessage`}
*/
function frequest (Iurl,
                  Ioptions,
                  callback = function (e) { return e }
                  ) {
  let url
  try{
    url = new URL(Iurl)
  } catch(e){
    return err(e)
  }

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
      Resp.setEncoding('utf8');
      Resp.on('data',(chunk)=>{
        let e = {
          body : chunk,
          response : Resp
        }
        callback(e)
      })
    })
    if(options.body != '') aReq.write(options.body)
    aReq.end()
  } catch (e) {
    return err(e)
  }
}
console.log(frequest('https://api-takumi.mihoyo.com/game_record/card/wapi/getGameRecordCard?uid=246865371',{},(e)=>{console.log(e.body)}))
module.exports = frequest