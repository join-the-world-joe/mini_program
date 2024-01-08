const { Code } = require("../../code/code")

class FetchIdListOfADOfDealsReq {
  constructor() {

  }
}

class FetchIdListOfADOfDealsRsp {
   constructor() {
    this.code = Code.InternalError
    this.version_of_ad_of_deals = -1
    this.id_list_of_ad_of_deals = []
  }
  GetCode() {
    return this.code
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
      if (json.body.id_list_of_ad_of_deals != undefined) {
        this.id_list_of_ad_of_deals = json.body.id_list_of_ad_of_deals
      }
    }
    return this
  }
}

module.exports = {
  FetchIdListOfADOfDealsReq,
  FetchIdListOfADOfDealsRsp
}