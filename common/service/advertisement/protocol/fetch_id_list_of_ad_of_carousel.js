const { Code } = require("../../code/code")

class FetchIdListOfADOfCarouselReq {
  constructor() {

  }
}

class FetchIdListOfADOfCarouselRsp {
   constructor() {
    this.code = Code.InternalError
    this.version_of_ad_of_carousel = -1
    this.id_list_of_ad_of_carousel = []
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
      if (json.body.version_of_ad_of_carousel != undefined) {
        this.version_of_ad_of_carousel = json.body.version_of_ad_of_carousel
      }
      if (json.body.id_list_of_ad_of_carousel != undefined) {
        this.id_list_of_ad_of_carousel = json.body.id_list_of_ad_of_carousel
      }
    }
    return this
  }
}

module.exports = {
  FetchIdListOfADOfCarouselReq,
  FetchIdListOfADOfCarouselRsp
}