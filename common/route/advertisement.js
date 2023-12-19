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
      case Advertisement.FetchVersionOfADOfCarouselReq:
        return 'FetchVersionOfADOfCarouselReq'
      case Advertisement.FetchVersionOfADOfCarouselRsp:
        return 'FetchVersionOfADOfCarouselRsp'
      case Advertisement.FetchIdListOfADOfCarouselReq:
        return 'FetchIdListOfADOfCarouselReq'
      case Advertisement.FetchIdListOfADOfCarouselRsp:
        return 'FetchIdListOfADOfCarouselRsp'
      case Advertisement.FetchRecordsOfADOfCarouselReq:
        return 'FetchRecordsOfADOfCarouselReq'
      case Advertisement.FetchRecordsOfADOfCarouselRsp:
        return 'FetchRecordsOfADOfCarouselRsp'
      case Advertisement.FetchVersionOfADOfDealsReq:
        return 'FetchVersionOfADOfDealsReq'
      case Advertisement.FetchVersionOfADOfDealsRsp :
        return 'FetchVersionOfADOfDealsRsp'
      case Advertisement.FetchIdListOfADOfDealsReq:
        return 'FetchIdListOfADOfDealsReq'
      case Advertisement.FetchIdListOfADOfDealsRsp:
        return 'FetchIdListOfADOfDealsRsp'
      case Advertisement.FetchRecordsOfADOfDealsReq:
        return 'FetchRecordsOfADOfDealsReq'
      case Advertisement.FetchRecordsOfADOfDealsRsp:
        return 'FetchRecordsOfADOfDealsRsp'
      case Advertisement.FetchVersionOfADOfHotsReq:
        return 'FetchVersionOfADOfHotsReq'
      case Advertisement.FetchVersionOfADOfHotsRsp:
        return 'FetchVersionOfADOfHotsRsp'
      case Advertisement.FetchIdListOfADOfHotsReq:
        return 'FetchIdListOfADOfHotsReq'
      case Advertisement.FetchIdListOfADOfHotsRsp:
        return 'FetchIdListOfADOfHotsRsp'
      case Advertisement.FetchRecordsOfADOfHotsReq:
        return 'FetchRecordsOfADOfHotsReq'
      case Advertisement.FetchRecordsOfADOfHotsRsp:
        return 'FetchRecordsOfADOfHotsRsp'
      case Advertisement.FetchVersionOfADOfBarbecueReq:
        return 'FetchVersionOfADOfBarbecueReq'
      case Advertisement.FetchVersionOfADOfBarbecueRsp:
        return 'FetchVersionOfADOfBarbecueRsp'
      case Advertisement.FetchIdListOfADOfBarbecueReq:
        return 'FetchIdListOfADOfBarbecueReq'
      case Advertisement.FetchIdListOfADOfBarbecueRsp:
        return 'FetchIdListOfADOfBarbecueRsp'
      case Advertisement.FetchRecordsOfADOfBarbecueReq:
        return 'FetchRecordsOfADOfBarbecueReq'
      case Advertisement.FetchRecordsOfADOfBarbecueRsp:
        return 'FetchRecordsOfADOfBarbecueRsp'
      case Advertisement.FetchVersionOfADOfSnacksReq:
        return 'FetchVersionOfADOfSnacksReq'
      case Advertisement.FetchVersionOfADOfSnacksRsp:
        return 'FetchVersionOfADOfSnacksRsp'
      case Advertisement.FetchIdListOfADOfSnacksReq:
        return 'FetchIdListOfADOfSnacksReq'
      case Advertisement.FetchIdListOfADOfSnacksRsp:
        return 'FetchIdListOfADOfSnacksRsp'
      case Advertisement.FetchRecordsOfADOfSnacksReq:
        return 'FetchRecordsOfADOfSnacksReq'
      case Advertisement.FetchRecordsOfADOfSnacksRsp:
        return 'FetchRecordsOfADOfSnacksRsp'
      default:
        return 'unknown'
    }
  }
}

module.exports = {
  Advertisement
}