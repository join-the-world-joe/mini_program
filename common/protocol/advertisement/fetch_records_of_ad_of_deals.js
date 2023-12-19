const { Code } = require("../../code/code")

class FetchRecordsOfADOfDealsReq {
  constructor() {
    this.advertisement_id_list = []
  }
  SetAdvertisementIdList(idList) {
    this.advertisement_id_list = idList
  }
}

class FetchRecordsOfADOfDealsRsp {
   constructor() {
    this.code = Code.InternalError
    this.records_of_ad_of_deals = new Object()
  }
  GetCode() {
    return this.code
  }
  GetRecordsOfADOfDeals() {
    return this.records_of_ad_of_deals
  }
  FromJson(json) { 
    if (json != undefined) {
      if (json.code != undefined) {
        this.code = json.code
      }
    }
    if (json.body != undefined) {
      if (json.body.records_of_ad_of_deals != undefined) {
        this.records_of_ad_of_deals = json.body.records_of_ad_of_deals
      }
    }
    return this
  }
}

module.exports = {
  FetchRecordsOfADOfDealsReq,
  FetchRecordsOfADOfDealsRsp
}