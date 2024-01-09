const { Code } = require("../../../code/code")

class FetchVersionOfADOfCarouselReq {
  constructor() {

  }
}

class FetchVersionOfADOfCarouselRsp {
   constructor() {
    this.code = Code.InternalError
    this.version_of_ad_of_carousel = -1
  }
  GetCode() {
    return this.code
  }
  GetVersionOfADOfCarousel() {
    return this.version_of_ad_of_carousel
  }
  static FromJson(json) { 
    var that = new FetchVersionOfADOfCarouselRsp()
    if (json != undefined) {
      if (json.code != undefined) {
        that.code = json.code
      }
      if (json.body != undefined) {
        if (json.body.version_of_ad_of_carousel != undefined) {
          that.version_of_ad_of_carousel = json.body.version_of_ad_of_carousel
        }
      }
    }
    return that
  }
}

module.exports = {
  FetchVersionOfADOfCarouselReq,
  FetchVersionOfADOfCarouselRsp
}