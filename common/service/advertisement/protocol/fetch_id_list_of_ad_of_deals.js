const {Code} = require('../../../code/code')
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
  static FromJson(json) { 
    var that = new FetchIdListOfADOfDealsRsp()
    if (json != undefined) {
      if (json.code != undefined) {
        that.code = json.code
      }
      if (json.body != undefined) {
        if (json.body.version_of_ad_of_deals != undefined) {
          that.version_of_ad_of_deals = json.body.version_of_ad_of_deals
        }
        if (json.body.id_list_of_ad_of_deals != undefined) {
          that.id_list_of_ad_of_deals = json.body.id_list_of_ad_of_deals
        }
      }
    }
    return that
  }
}

module.exports = {
  FetchIdListOfADOfDealsReq,
  FetchIdListOfADOfDealsRsp
}