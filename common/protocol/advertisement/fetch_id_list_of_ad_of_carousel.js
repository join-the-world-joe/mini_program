const { Code } = require("../../code/code")

class FetchIdListOfADOfCarouselReq {
  constructor() {

  }
}

class FetchIdListOfADOfCarouselRsp {
   constructor() {
    this._code = Code.InternalError
    this._version = -1
  }
  GetCode() {
    return this._code
  }
  FromJson(json) { 
    if (json != undefined) {
      if (json.code != undefined) {
        this._code = json.code
      }
    }
    return this
  }
}

module.exports = {
  FetchIdListOfADOfCarouselReq,
  FetchIdListOfADOfCarouselRsp
}