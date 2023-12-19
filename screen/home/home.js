const { Carousel } = require('../../cache/carousel')
const { FetchIdListOfADOfCarousel } = require('../../common/business/advertisement/fetch_id_list_of_ad_of_carousel')
const { Config } = require('../../config/config')
const { Major } = require("../../common/route/major")
const { Advertisement } = require('../../common/route/advertisement')
const { Runtime } = require("../../runtime/runtime")
const { Log } = require("../../utils/log")
const { FetchIdListOfADOfCarouselRsp } = require('../../common/protocol/advertisement/fetch_id_list_of_ad_of_carousel')
const { FetchVersionOfADOfCarouselRsp } = require('../../common/protocol/advertisement/fetch_version_of_ad_of_carousel')
const { Code } = require('../../common/code/code')
const { Translator } = require('../../common/translator/translator')
const { TitleOfLoading, TitleOfDeals, TitleOfCamping, TitleOfBarbecue, TitleOfSnacks } = require('../../common/language/language')
const { FetchVersionOfADOfCarousel } = require('../../common/business/advertisement/fetch_version_of_ad_of_carousel')
const { FetchRecordsOfADOfCarousel } = require('../../common/business/advertisement/fetch_records_of_ad_of_carousel')
const { FetchRecordsOfADOfCarouselRsp } = require('../../common/protocol/advertisement/fetch_records_of_ad_of_carousel')
var modelOfAdvertisement = require('../../model/advertisement')
const { FetchVersionOfADOfDeals } = require('../../common/business/advertisement/fetch_version_of_ad_of_deals')
const { FetchVersionOfADOfDealsRsp } = require('../../common/protocol/advertisement/fetch_version_of_ad_of_deals')
const { FetchIdListOfADOfDeals } = require('../../common/business/advertisement/fetch_id_list_of_ad_of_deals')
const { FetchRecordsOfADOfDeals } = require('../../common/business/advertisement/fetch_records_of_ad_of_deals')
const { FetchIdListOfADOfDealsRsp } = require('../../common/protocol/advertisement/fetch_id_list_of_ad_of_deals')
const { FetchRecordsOfADOfDealsRsp } = require('../../common/protocol/advertisement/fetch_records_of_ad_of_deals')
Page({

  /**
   * Page initial data
   */
  data: {
    from: 'home',
    hideMenu: true,
    indexOfSubMenu: 1,
    subMenuSelected: false,
    loadMenuCompleted: false,
    versionOfADOfCarousel: 0,
    idListOfADOfCarousel: [],
    recordsOfADOfCarousel: new Object, // key: advertisement id, value: advertisement
    versionOfADOfDeals: 0,
    idListOfADOfDeals: [],
    recordsOfADOfDeals: new Object,
    showLoading: false,
    titleOfDeals: '',
    titleOfCamping: '',
    titleOfBarbecue: '',
    titleOfSnacks: '',

    hideCarousel: true,
    loadCarouselCompleted: false,
    versionOfADOfCarouselRequested: false,
    versionOfADOfCarouselRequestTime: undefined,
    versionOfADOfCarouselRequestCompleted: false,
    idListOfADOfCarouselRequested: false,
    idListOfADOfCarouselRequestTime: undefined,
    idListOfADOfCarouselRequestCompleted: false,
    recordsOfADOfCarouselRequested: false,
    recordsOfADOfCarouselRequestTime: undefined,
    recordsOfADOfCarouselRequestCompleted: false,

    hideContent: true,
    loadDealsCompleted: false,
    versionOfADOfDealsRequested: false,
    versionOfADOfDealsRequestTime: undefined,
    versionOfADOfDealsRequestCompleted: false,
    idListOfADOfDealsRequested: false,
    idListOfADOfDealsRequestTime: undefined,
    idListOfADOfDealsRequestCompleted: false,
    recordsOfADOfDealsRequested: false,
    recordsOfADOfDealsRequestTime: undefined,
    recordsOfADOfDealsRequestCompleted: false,
  },
  setup() {
    Runtime.SetPeriod(Config.PeriodOfScreenInitialisation)
    Runtime.SetObserve(this.observe)
    Runtime.SetPeriodc(this.process)
    if (!this.data.showLoading) {
      wx.showLoading({
        title: Translator.Translate(TitleOfLoading),
      })
    }
    // try to read the cache of carousel from local storage
    var cache = wx.getStorageSync(Config.KeyOfCarousel)
    if (cache.length > 0) {
      try {
        console.log("cache: ", cache)
        var versionOfADOfCarousel = cache.version_of_ad_of_carousel
        var idListOfADOfcarousel = cache.id_list_of_ad_of_carousel
        this.setData({
          versionOfADOfCarousel: versionOfADOfCarousel,
          idListOfADOfCarousel: idListOfADOfcarousel
        })
      } catch(e) {
        console.log('read from cache failure, err: ', e)
        this.setData({
          versionOfADOfCarousel: 0,
          idListOfADOfCarousel: []
        })
      }
    }
  },
  carousel() {
    var caller = 'carousel'
    if (this.data.versionOfADOfCarouselRequestCompleted &&
      this.data.idListOfADOfCarouselRequestCompleted &&
      this.data.recordsOfADOfCarouselRequestCompleted &&
      !this.data.loadCarouselCompleted) {
        this.setData({
          hideCarousel: false,
          loadCarouselCompleted: true,
        })
    }
    if (!this.data.versionOfADOfCarouselRequested) {
        // send request
        FetchVersionOfADOfCarousel({from:this.data.from, caller: caller})
        this.setData({
          versionOfADOfCarouselRequested: true,
          versionOfADOfCarouselRequestTime: Date.now()
        })
    }
    if (this.data.versionOfADOfCarouselRequestCompleted &&
      !this.data.idListOfADOfCarouselRequested) {
        FetchIdListOfADOfCarousel({from: this.data.from,caller: caller})
        this.setData({
          idListOfADOfCarouselRequested: true,
          idListOfADOfCarouselRequestTime: Date.now()
        })
    }
    if (this.data.versionOfADOfCarouselRequestCompleted &&
      this.data.idListOfADOfCarouselRequestCompleted &&
      !this.data.recordsOfADOfCarouselRequested) {
        FetchRecordsOfADOfCarousel({from: this.data.from,caller: caller, advertisementIdList:this.data.idListOfADOfCarousel})
        this.setData({
          recordsOfADOfCarouselRequested: true,
          recordsOfADOfCarouselRequestTime: Date.now()
        })
    }
  },
  menu() {
    var caller = 'menu'
    if (this.data.loadCarouselCompleted &&
      this.data.loadDealsCompleted &&
      !this.data.loadMenuCompleted) {
      this.setData({
        loadMenuCompleted: true,
        hideMenu: false,
      })
    }
  },
  content() {
    var caller = 'content'
    if (!this.data.subMenuSelected && 
      this.data.indexOfSubMenu == 1 &&
      this.data.loadCarouselCompleted) {
      if (this.data.versionOfADOfDealsRequestCompleted &&
        this.data.idListOfADOfDealsRequestCompleted &&
        this.data.recordsOfADOfDealsRequestCompleted &&
        !this.data.loadDealsCompleted) {
          this.setData({
            hideContent: false,
            loadDealsCompleted: true,
          })
      }
      if (!this.data.versionOfADOfDealsRequested) {
        FetchVersionOfADOfDeals({from:this.data.from, caller:caller})
        this.setData({
          versionOfADOfDealsRequested: true,
          versionOfADOfDealsRequestTime: Date.now()
        })
      }
      if (this.data.versionOfADOfDealsRequestCompleted &&
        !this.data.idListOfADOfDealsRequested) {
          FetchIdListOfADOfDeals({from: this.data.from,caller: caller})
          this.setData({
            idListOfADOfDealsRequested: true,
            idListOfADOfDealsRequestTime: Date.now()
          })
      }
      if (this.data.versionOfADOfDealsRequestCompleted &&
        this.data.idListOfADOfDealsRequestCompleted &&
        !this.data.recordsOfADOfDealsRequested) {
          FetchRecordsOfADOfDeals({from: this.data.from,caller: caller, advertisementIdList:this.data.idListOfADOfDeals})
          this.setData({
            recordsOfADOfDealsRequested: true,
            recordsOfADOfDealsRequestTime: Date.now()
          })
      }
    }
  },
  checkLoading() {
    if (this.data.loadCarouselCompleted &&
      this.data.loadDealsCompleted &&
      this.data.loadMenuCompleted) {
      wx.hideLoading()
    }
  },
  process() {
    this.carousel()
    this.menu()
    this.content()
    this.checkLoading()
    // if all completed, set period to normal
  },
  observe(packet) {
    try{
      var caller = 'observe';
      var major = packet.GetHeader().GetMajor()
      var minor = packet.GetHeader().GetMinor()
      
      Log.Debug({
        major: major,
        minor: minor,
        from: this.data.from,
        caller: caller,
        message: 'responded',
      })
      
      if (major == Major.Advertisement && 
        minor == Advertisement.FetchVersionOfADOfCarouselRsp) {
        this.fetchVersionOfADOfCarouselHandler(packet)
      } else if (major == Major.Advertisement && 
        minor == Advertisement.FetchIdListOfADOfCarouselRsp) {
        this.fetchIdListOfADOfCarouselHandler(packet)
      } else if(major == Major.Advertisement && 
        minor == Advertisement.FetchRecordsOfADOfCarouselRsp) {
        this.fetchRecordsOfADOfCarouselHandler(packet)
      } else if (major == Major.Advertisement &&
        minor == Advertisement.FetchVersionOfADOfDealsRsp) {
        this.fetchVersionOfADOfDealsHandler(packet)
      } else if (major == Major.Advertisement &&
        minor == Advertisement.FetchIdListOfADOfDealsRsp) {
        this.fetchIdListOfADOfDealsHandler(packet)
      } else if (major == Major.Advertisement &&
        minor == Advertisement.FetchRecordsOfADOfDealsRsp) {
        this.fetchRecordsOfADOfDealsHandler(packet)
      }else {
        Log.Debug({
          major: major,
          minor: minor,
          from: this.data.from,
          caller: caller,
          message: 'not matched',
        })
      }
    } catch(e) {
      Log.Debug({
        major: major,
        minor: minor,
        from: this.data.from,
        caller: caller,
        message: 'failure, err: ' + e,
      })
    } finally {
      return 
    }
  },
  fetchRecordsOfADOfDealsHandler(packet) {
    var caller = 'fetchRecordsOfADOfDeals'
    var response = (new FetchRecordsOfADOfDealsRsp).FromJson(packet.GetBody())
    Log.Debug({
      major: packet.GetHeader().GetMajor(),
      minor: packet.GetHeader().GetMinor(),
      from: this.data.from,
      caller: caller,
      message: 'code: ' + response.GetCode(),
    })
    if (response.GetCode() == Code.OK) {
      // success
      // console.log('recordsOfADOfCarouse: ', response.GetRecordsOfADOfCarousel())
      var records = response.GetRecordsOfADOfDeals()
      for (var i=0; i<records.length; i++) {
        var advertisement = (new modelOfAdvertisement.Advertisement()).FromJson(records[i])
        var temp = this.data.recordsOfADOfCarousel
        temp[advertisement.advertisement_id] = advertisement
        this.setData({
          recordsOfADOfDeals:temp,
        })
      }
      this.setData({
        recordsOfADOfDealsRequestCompleted: true,
      })
      console.log(this.data.recordsOfADOfDeals)
    } else {
      // error occurs
    }
  },
  fetchIdListOfADOfDealsHandler(packet) {
    var caller = 'fetchIdListOfADOfDealsHandler'
    var response = (new FetchIdListOfADOfDealsRsp).FromJson(packet.GetBody())
    Log.Debug({
      major: packet.GetHeader().GetMajor(),
      minor: packet.GetHeader().GetMinor(),
      from: this.data.from,
      caller: caller,
      message: 'code: ' + response.GetCode(),
    })
    if (response.GetCode() == Code.OK) {
      // success
      this.setData({
        versionOfADOfDeals: response.version_of_ad_of_deals,
        idListOfADOfDeals: response.id_list_of_ad_of_deals,
        idListOfADOfDealsRequestCompleted: true,
      })
    } else {
      // error occurs
    }
  },
  fetchVersionOfADOfDealsHandler(packet) {
    var caller = 'fetchVersionOfADOfDealsHandler'
    var response = (new FetchVersionOfADOfDealsRsp).FromJson(packet.GetBody())
    Log.Debug({
      major: packet.GetHeader().GetMajor(),
      minor: packet.GetHeader().GetMinor(),
      from: this.data.from,
      caller: caller,
      message: 'code: ' + response.GetCode(),
    })
    if (response.GetCode() == Code.OK) { 
      // success
      this.setData({
        versionOfADOfDeals: response.GetVersionOfADOfDeals(),
        versionOfADOfDealsRequestCompleted: true,
      })
    } else {
      // error occurs
    }
  },
  fetchRecordsOfADOfCarouselHandler(packet) {
    var caller = 'fetchRecordsOfADOfCarousel'
    var response = (new FetchRecordsOfADOfCarouselRsp).FromJson(packet.GetBody())
    Log.Debug({
      major: packet.GetHeader().GetMajor(),
      minor: packet.GetHeader().GetMinor(),
      from: this.data.from,
      caller: caller,
      message: 'code: ' + response.GetCode(),
    })
    if (response.GetCode() == Code.OK) {
      // success
      // console.log('recordsOfADOfCarouse: ', response.GetRecordsOfADOfCarousel())
      var records = response.GetRecordsOfADOfCarousel()
      for (var i=0; i<records.length; i++) {
        var advertisement = (new modelOfAdvertisement.Advertisement()).FromJson(records[i])
        var temp = this.data.recordsOfADOfCarousel
        temp[advertisement.advertisement_id] = advertisement
        this.setData({
          recordsOfADOfCarousel:temp,
        })
      }
      this.setData({
        recordsOfADOfCarouselRequestCompleted: true,
      })
      // console.log(this.data.recordsOfADOfCarousel)
    } else {
      // error occurs
    }
  },
  fetchVersionOfADOfCarouselHandler(packet) {
    var caller = 'fetchVersionOfADOfCarouselHandler'
    var response = (new FetchVersionOfADOfCarouselRsp).FromJson(packet.GetBody())
    Log.Debug({
      major: packet.GetHeader().GetMajor(),
      minor: packet.GetHeader().GetMinor(),
      from: this.data.from,
      caller: caller,
      message: 'code: ' + response.GetCode(),
    })
    if (response.GetCode() == Code.OK) { 
      // success
      this.setData({
        versionOfADOfCarousel: response.GetVersionOfADOfCarousel(),
        versionOfADOfCarouselRequestCompleted: true,
      })
    } else {
      // error occurs
    }
  },
  fetchIdListOfADOfCarouselHandler(packet) {
    var caller = 'fetchIdListOfADOfCarouselHandler'
    var response = (new FetchIdListOfADOfCarouselRsp).FromJson(packet.GetBody())
    Log.Debug({
      major: packet.GetHeader().GetMajor(),
      minor: packet.GetHeader().GetMinor(),
      from: this.data.from,
      caller: caller,
      message: 'code: ' + response.GetCode(),
    })
    if (response.GetCode() == Code.OK) {
      // success
      this.setData({
        versionOfADOfCarousel: response.version_of_ad_of_carousel,
        idListOfADOfCarousel: response.id_list_of_ad_of_carousel,
        idListOfADOfCarouselRequestCompleted: true,
      })
    } else {
      // error occurs
    }
  },
  onTapDeals() {
    console.log('onTapDeals')
    this.setData({
      indexOfSubMenu:1,
    })
  },
  onTapComping() {
    console.log('onTapComping')
    this.setData({
      indexOfSubMenu:2,
    })
  },
  onTapBarbecue() {
    console.log('onTapBarbecue')
    this.setData({
      indexOfSubMenu:3,
    })
  },
  onTapSnacks() {
    console.log('onTapSnacks')
    this.setData({
      indexOfSubMenu:4,
    })
  },
  onSet() {
    if (this.data.hideCarousel) {
      console.log('ignore on set')
      return
    }
    var carousel = new Carousel()
    carousel.SetVersionOfADOfCarousel(3)
    carousel.SetIdListOfADOfCarousel([1, 2, 3])
    wx.setStorageSync('carousel', carousel)
  },
  onGet() {
    if (this.data.hideCarousel) {
      console.log('ignore on get')
      return
    }
    var carousel = new Carousel()
    var raw = wx.getStorageSync('carousel')
    carousel.FromJson(raw)
    console.log(carousel)
    var raw = wx.getStorageSync('xxxxx')
    if (raw == undefined) {
      console.log('raw und')
    }
    console.log(raw.length)
  },
  onClear() {
    if (this.data.hideCarousel) {
      console.log('ignore on clear')
      return
    }
    wx.removeStorageSync(Config.KeyOfCarousel)
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    this.setup()
    this.setData({
      titleOfBarbecue: Translator.Translate(TitleOfBarbecue),
      titleOfDeals: Translator.Translate(TitleOfDeals),
      titleOfSnacks: Translator.Translate(TitleOfSnacks),
      titleOfCamping: Translator.Translate(TitleOfCamping),
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {
  
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {
    
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  }
})