declare module "frequest" {

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
  function frequest(Iurl : String, Ioptions : Object, callback : (e:Object)=>void) : String
}
