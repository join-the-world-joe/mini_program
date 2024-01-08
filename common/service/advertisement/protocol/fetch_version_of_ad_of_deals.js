const { Code } = require("../../code/code")

class FetchVersionOfADOfDealsReq {
  constructor() {

  }
}

class FetchVersionOfADOfDealsRsp {
   constructor() {
    this.code = Code.InternalError
    this.version_of_ad_of_deals = -1
  }
  GetCode() {
    return this.code
  }
  GetVersionOfADOfDeals() {
    return this.version_of_ad_of_deals
  }
  FromJson(json) { 
    if (json != undefined) {
      if (json.code != undefined) {
        this.code = json.code
      }
    }
    if (json.body != undefined) {
      if (json.body.version_of_ad_of_deals != undefined) {
        this.version_of_ad_of_deals = json.body.version_of_ad_of_deals
      }
    }
    return this
  }
}

module.exports = {
  FetchVersionOfADOfDealsReq,
  FetchVersionOfADOfDealsRsp
}