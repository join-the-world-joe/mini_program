class Carousel {
  constructor() {
    this.version_of_ad_of_carousel = 0
    this.id_list_of_ad_of_carousel = []
  }
  SetVersionOfADOfCarousel(version) {
    this.version_of_ad_of_carousel = version
  }
  SetIdListOfADOfCarousel(idList) {
    this.id_list_of_ad_of_carousel = idList
  }
  FromJson(json) {
    try{
      if (json.version_of_ad_of_carousel != undefined) {
        this.version_of_ad_of_carousel = json.version_of_ad_of_carousel
      }
      if (json.id_list_of_ad_of_carousel != undefined) {
        this.id_list_of_ad_of_carousel = json.id_list_of_ad_of_carousel
      }
    } catch(e) {
      console.log('Carousel.FromJson failure, e: ', e)
    }
  }
}

module.exports = {
  Carousel
}