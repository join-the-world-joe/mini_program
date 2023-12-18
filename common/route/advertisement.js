class Advertisement {
  static FetchVersionOfADOfCarouselReq = "1"
	static FetchVersionOfADOfCarouselRsp = "2"
	static FetchIdListOfADOfCarouselReq  = "3"
	static FetchIdListOfADOfCarouselRsp  = "4"
	static FetchRecordsOfADOfCarouselReq = "5"
	static FetchRecordsOfADOfCarouselRsp = "6"
	static FetchVersionOfADOfDealsReq    = "7"
	static FetchVersionOfADOfDealsRsp    = "8"
	static FetchIdListOfADOfDealsReq     = "9"
	static FetchIdListOfADOfDealsRsp     = "10"
	static FetchRecordsOfADOfDealsReq    = "11"
	static FetchRecordsOfADOfDealsRsp    = "12"
	static FetchVersionOfADOfHotsReq     = "13"
	static FetchVersionOfADOfHotsRsp     = "14"
	static FetchIdListOfADOfHotsReq      = "15"
	static FetchIdListOfADOfHotsRsp      = "16"
	static FetchRecordsOfADOfHotsReq     = "17"
	static FetchRecordsOfADOfHotsRsp     = "18"
	static FetchVersionOfADOfBarbecueReq = "19"
	static FetchVersionOfADOfBarbecueRsp = "20"
	static FetchIdListOfADOfBarbecueReq  = "21"
	static FetchIdListOfADOfBarbecueRsp  = "22"
	static FetchRecordsOfADOfBarbecueReq = "23"
	static FetchRecordsOfADOfBarbecueRsp = "24"
	static FetchVersionOfADOfSnacksReq   = "25"
	static FetchVersionOfADOfSnacksRsp   = "26"
	static FetchIdListOfADOfSnacksReq    = "27"
	static FetchIdListOfADOfSnacksRsp    = "28"
	static FetchRecordsOfADOfSnacksReq   = "29"
  static FetchRecordsOfADOfSnacksRsp   = "30"
  
  static GetName(input) {
    switch(input) {
      case this.FetchVersionOfADOfCarouselReq:
        return 'FetchVersionOfADOfCarouselReq'
      case this.FetchVersionOfADOfCarouselRsp:
        return 'FetchVersionOfADOfCarouselRsp'
      case this.FetchIdListOfADOfCarouselReq:
        return 'FetchIdListOfADOfCarouselReq'
      case this.FetchIdListOfADOfCarouselRsp:
        return 'FetchIdListOfADOfCarouselRsp'
      case this.FetchRecordsOfADOfCarouselReq:
        return 'FetchRecordsOfADOfCarouselReq'
      case this.FetchRecordsOfADOfCarouselRsp:
        return 'FetchRecordsOfADOfCarouselRsp'
      case this.FetchVersionOfADOfDealsReq:
        return 'FetchVersionOfADOfDealsReq'
      case this.FetchVersionOfADOfDealsRsp :
        return 'FetchVersionOfADOfDealsRsp'
      case this.FetchIdListOfADOfDealsReq:
        return 'FetchIdListOfADOfDealsReq'
      case this.FetchIdListOfADOfDealsRsp:
        return 'FetchIdListOfADOfDealsRsp'
      case this.FetchRecordsOfADOfDealsReq:
        return 'FetchRecordsOfADOfDealsReq'
      case this.FetchRecordsOfADOfDealsRsp:
        return 'FetchRecordsOfADOfDealsRsp'
      case this.FetchVersionOfADOfHotsReq:
        return 'FetchVersionOfADOfHotsReq'
      case this.FetchVersionOfADOfHotsRsp:
        return 'FetchVersionOfADOfHotsRsp'
      case this.FetchIdListOfADOfHotsReq:
        return 'FetchIdListOfADOfHotsReq'
      case this.FetchIdListOfADOfHotsRsp:
        return 'FetchIdListOfADOfHotsRsp'
      case this.FetchRecordsOfADOfHotsReq:
        return 'FetchRecordsOfADOfHotsReq'
      case this.FetchRecordsOfADOfHotsRsp:
        return 'FetchRecordsOfADOfHotsRsp'
      case this.FetchVersionOfADOfBarbecueReq:
        return 'FetchVersionOfADOfBarbecueReq'
      case this.FetchVersionOfADOfBarbecueRsp:
        return 'FetchVersionOfADOfBarbecueRsp'
      case this.FetchIdListOfADOfBarbecueReq:
        return 'FetchIdListOfADOfBarbecueReq'
      case this.FetchIdListOfADOfBarbecueRsp:
        return 'FetchIdListOfADOfBarbecueRsp'
      case this.FetchRecordsOfADOfBarbecueReq:
        return 'FetchRecordsOfADOfBarbecueReq'
      case this.FetchRecordsOfADOfBarbecueRsp:
        return 'FetchRecordsOfADOfBarbecueRsp'
      case this.FetchVersionOfADOfSnacksReq:
        return 'FetchVersionOfADOfSnacksReq'
      case this.FetchVersionOfADOfSnacksRsp:
        return 'FetchVersionOfADOfSnacksRsp'
      case this.FetchIdListOfADOfSnacksReq:
        return 'FetchIdListOfADOfSnacksReq'
      case this.FetchIdListOfADOfSnacksRsp:
        return 'FetchIdListOfADOfSnacksRsp'
      case this.FetchRecordsOfADOfSnacksReq:
        return 'FetchRecordsOfADOfSnacksReq'
      case this.FetchRecordsOfADOfSnacksRsp:
        return 'FetchRecordsOfADOfSnacksRsp'
      default:
        return 'unknown'
    }
  }
}

module.exports = {
  Advertisement
}