const {Code} = require('../../../code/code')
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
  static FromJson(json) { 
    var that = new FetchIdListOfADOfCarouselRsp()
    if (json != undefined) {
      if (json.code != undefined) {
        that.code = json.code
      }
      if (json.body != undefined) {
        if (json.body.version_of_ad_of_carousel != undefined) {
          that.version_of_ad_of_carousel = json.body.version_of_ad_of_carousel
        }
        if (json.body.id_list_of_ad_of_carousel != undefined) {
          that.id_list_of_ad_of_carousel = json.body.id_list_of_ad_of_carousel
        }
      }
    }
    return that
  }
}

module.exports = {
  FetchIdListOfADOfCarouselReq,
  FetchIdListOfADOfCarouselRsp
}