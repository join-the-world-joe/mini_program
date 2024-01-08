const { Code } = require("../../code/code")

class FetchRecordsOfADOfCarouselReq {
  constructor() {
    this.advertisement_id_list = []
  }
  SetAdvertisementIdList(idList) {
    this.advertisement_id_list = idList
  }
}

class FetchRecordsOfADOfCarouselRsp {
   constructor() {
    this.code = Code.InternalError
    this.records_of_ad_of_carousel = new Object()
  }
  GetCode() {
    return this.code
  }
  GetRecordsOfADOfCarousel() {
    return this.records_of_ad_of_carousel
  }
  FromJson(json) { 
    if (json != undefined) {
      if (json.code != undefined) {
        this.code = json.code
      }
    }
    if (json.body != undefined) {
      if (json.body.records_of_ad_of_carousel != undefined) {
        this.records_of_ad_of_carousel = json.body.records_of_ad_of_carousel
      }
    }
    return this
  }
}

module.exports = {
  FetchRecordsOfADOfCarouselReq,
  FetchRecordsOfADOfCarouselRsp
}