const { Carousel } = require('../../cache/carousel')
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
const { FetchRecordsOfADOfCarouselRsp } = require('../../common/protocol/advertisement/fetch_records_of_ad_of_carousel')
var modelOfAdvertisement = require('../../model/advertisement')
const { FetchVersionOfADOfDealsRsp } = require('../../common/protocol/advertisement/fetch_version_of_ad_of_deals')
const { FetchIdListOfADOfDealsRsp } = require('../../common/protocol/advertisement/fetch_id_list_of_ad_of_deals')
const { FetchRecordsOfADOfDealsRsp } = require('../../common/protocol/advertisement/fetch_records_of_ad_of_deals')
const {FetchVersionOfADOfCarouselProgress} = require('../../progress/fetch_version_of_ad_of_carousel_progress')
const { FetchIdListOfADOfCarouselProgress } = require('../../progress/fetch_id_list_of_ad_of_carousel_progress')
const { FetchRecordsOfADOfCarouselProgress } = require('../../progress/fetch_records_of_ad_of_carousel_progress')
const { FetchVersionOfADOfDealsProgress } = require('../../progress/fetch_version_of_ad_of_deals_progress')
const { FetchIdListOfADOfDealsProgress } = require('../../progress/fetch_id_list_of_ad_of_deals_progress')
const { FetchRecordsOfADOfDealsProgress } = require('../../progress/fetch_records_of_ad_of_deals_progress')
const {Menu} = require('../../common/macro/menu')

Page({

  /**
   * Page initial data
   */
  data: {
    from: 'home',
    showLoading: false,
    loadCompleted: false,
    indexOfSubMenu: Menu.Deals,
    hideMenu: true,
    subMenuSelected: false,
    versionOfADOfCarousel: 0,
    idListOfADOfCarousel: [],
    recordsOfADOfCarousel: new Object(), // key: advertisement id, value: advertisement
    versionOfADOfDeals: 0,
    idListOfADOfDeals: [],
    recordsOfADOfDeals: new Object,
    leftHalfRecordsOfADOfDeals: new Object,
    rightHalfRecordsOfADOfDeals: new Object,
    leftHalfRecordsOfADOfComping: new Object,
    rightHalfRecordsOfADOfComping: new Object,

    hideCarousel: true,
    loadCarouselCompleted: false,
    progressOfFetchVersionOfADOfCarousel: undefined,
    progressOfFetchIdListOfADOfCarousel: undefined,
    progressOfFetchRecordsOfADOfCarousel: undefined,
    hasFigureOutArgumentOfFetchRecordsOfADOfCarousel: false,

    hideContent: true,
    loadDealsCompleted: false,
    progressOfFetchVersionOfADOfDeals: undefined,
    progressOfFetchIdListOfADOfDeals: undefined,
    progressOfFetchRecordsOfADOfDeals: undefined,
    progressOfFetchRecordsOfADOfDeals: undefined,
    hasFigureOutArgumentOfFetchRecordsOfADOfDeals: false,

    loadCompingCompleted: false,

    loadBarbecueCompleted: false,

    loadSnacksCompleted: false,

    titleOfDeals: '',
    titleOfCamping: '',
    titleOfBarbecue: '',
    titleOfSnacks: '',
    DealsOfMenu: Menu.Deals,
    CompingOfMenu: Menu.Comping,
    BarbecueOfMenu: Menu.Barbecue,
    SnacksOfMenu: Menu.Snacks,
  },
  onPullDownRefresh:function() {
    console.log('onPullDownRefresh')
    // 模拟异步请求数据的过程
    setTimeout(() => {
      // this.loadData();
      this.reloadScreen()

      // 数据请求完成后调用停止下拉刷新的方法
      wx.stopPullDownRefresh();
    }, 1000);
  },
  reloadScreen() {
    this.setData({
      active: false,
      showLoading: false,
      loadCompleted: false,
      hideMenu: true,
      hideCarousel: true,
      hideContent: true,
      loadCarouselCompleted: false,
      loadDealsCompleted: false,
      loadCompingCompleted: false,
      loadBarbecueCompleted: false,
      loadSnacksCompleted: false,
      recordsOfADOfCarousel: new Object(),
      recordsOfADOfDeals: new Object(),
      hasFigureOutArgumentOfFetchRecordsOfADOfCarousel: false,
      hasFigureOutArgumentOfFetchRecordsOfADOfDeals: false,
    })
    this.setData({
      progressOfFetchVersionOfADOfCarousel: new FetchVersionOfADOfCarouselProgress(this.data.from),
      progressOfFetchIdListOfADOfCarousel: new FetchIdListOfADOfCarouselProgress(this.data.from),
      progressOfFetchRecordsOfADOfCarousel: new FetchRecordsOfADOfCarouselProgress(this.data.from),
      progressOfFetchVersionOfADOfDeals: new FetchVersionOfADOfDealsProgress(this.data.from),
      progressOfFetchIdListOfADOfDeals: new FetchIdListOfADOfDealsProgress(this.data.from),
      progressOfFetchRecordsOfADOfDeals: new FetchRecordsOfADOfDealsProgress(this.data.from),
    })
    Runtime.SetPeriod(Config.PeriodOfScreenInitialisation)
    Runtime.SetObserve(this.observe)
    Runtime.SetPeriodc(this.progress)
  },
  onTest() {
    console.log('onTest')
    this.reloadScreen()
  },
  complete() {
    console.log('complete')
    if (!this.data.loadCompleted) {
      this.setData({
        loadCompleted: true,
      })
    }
    if (this.data.showLoading) {
      this.setData({
        showLoading: false,
      })
      wx.hideLoading()
    }
    Runtime.SetPeriod(Config.PeriodOfScreenNormal)
    Runtime.SetPeriodc(undefined)
  },
  setup() {
    // initialization
    this.reloadScreen()
  
    // try to read the cache of carousel from local storage
    // var cache = wx.getStorageSync(Config.KeyOfCarousel)
    // if (cache.length > 0) {
    //   try {
    //     console.log("cache: ", cache)
    //     var versionOfADOfCarousel = cache.version_of_ad_of_carousel
    //     var idListOfADOfcarousel = cache.id_list_of_ad_of_carousel
    //     this.setData({
    //       versionOfADOfCarousel: versionOfADOfCarousel,
    //       idListOfADOfCarousel: idListOfADOfcarousel
    //     })
    //   } catch(e) {
    //     console.log('read from cache failure, err: ', e)
    //     this.setData({
    //       versionOfADOfCarousel: 0,
    //       idListOfADOfCarousel: []
    //     })
    //   }
    // }
  },
  reloadCarouselProgress() {
    var ret = this.data.progressOfFetchVersionOfADOfCarousel.Progress()
    if (ret != 0) {
      return ret
    }

    var ret = this.data.progressOfFetchIdListOfADOfCarousel.Progress()
    if (ret != 0) {
      return ret
    }

    if (!this.data.hasFigureOutArgumentOfFetchRecordsOfADOfCarousel) {
      this.data.progressOfFetchRecordsOfADOfCarousel.SetAdvertisementIdList(this.data.idListOfADOfCarousel)
      this.data.hasFigureOutArgumentOfFetchRecordsOfADOfCarousel = true
    }

    ret = this.data.progressOfFetchRecordsOfADOfCarousel.Progress()
    if (ret != 0) {
      return ret
    }
    this.setData({
      loadCarouselCompleted: true
    })
  },
  reloadDealsProgress() {
    var ret = this.data.progressOfFetchVersionOfADOfDeals.Progress()
    if (ret != 0) {
      return ret
    }

    var ret = this.data.progressOfFetchIdListOfADOfDeals.Progress()
    if (ret != 0) {
      return ret
    }

    if (!this.data.hasFigureOutArgumentOfFetchRecordsOfADOfDeals) {
      this.data.progressOfFetchRecordsOfADOfDeals.SetAdvertisementIdList(this.data.idListOfADOfDeals)
      this.data.hasFigureOutArgumentOfFetchRecordsOfADOfDeals = true
    }

    var ret = this.data.progressOfFetchRecordsOfADOfDeals.Progress()
    if (ret != 0) {
      return ret
    }
    this.setData({
      loadDealsCompleted: true
    })
  },
  progress() {
    if (this.data.loadCompleted) {
      return
    }

    if (!this.data.showLoading) {
      wx.showLoading({
        title: Translator.Translate(TitleOfLoading),
      })
      this.setData({
        showLoading: true,
      })
    }

    if (!this.data.loadCarouselCompleted) {
      var ret = this.reloadCarouselProgress() 
      if (ret < 0 || ret > 0) {
        if (ret < 0) {
          this.complete()
        }
        return
      }
    }
    
    if (this.data.indexOfSubMenu == Menu.Deals) { // Deals
      if (!this.data.loadDealsCompleted) {
        ret = this.reloadDealsProgress()
        if (ret < 0 || ret > 0) {
          if (ret < 0) {
            this.complete()
          }
          return
        }
      }
    } else if (this.data.indexOfSubMenu == Menu.Comping) { // Comping

    } else if (this.data.indexOfSubMenu == Menu.Barbecue) { // Barbecue

    } else { // Snacks
      // Snacks
    }

    this.setData({
      hideMenu: false,
      hideCarousel: false,
      hideContent: false,
    })

    this.complete()
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
      } else {
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
    var caller = 'fetchRecordsOfADOfDealsHandler'
    var response = (new FetchRecordsOfADOfDealsRsp).FromJson(packet.GetBody())
    Log.Debug({
      major: packet.GetHeader().GetMajor(),
      minor: packet.GetHeader().GetMinor(),
      from: this.data.from,
      caller: caller,
      message: 'code: ' + response.GetCode(),
    })
    if (this.data.progressOfFetchRecordsOfADOfDeals != undefined) {
      this.data.progressOfFetchRecordsOfADOfDeals.Respond(response)
    }
    if (response.GetCode() == Code.OK) {
      // success
      var records = response.GetRecordsOfADOfDeals()
      for (var i=0; i<records.length; i++) {
        var advertisement = (new modelOfAdvertisement.Advertisement()).FromJson(records[i])
        var temp = this.data.recordsOfADOfDeals
        temp[advertisement.advertisement_id] = advertisement
        this.setData({
          recordsOfADOfDeals:temp,
        })
      }
      var leftHalf = new Object();
      var rightHalf = new Object();
      var current = 0;
      for (var e in this.data.recordsOfADOfDeals) {
        if (current % 2 == 0) {
          leftHalf[e] = this.data.recordsOfADOfDeals[e]
        } else {
          rightHalf[e] = this.data.recordsOfADOfDeals[e]
        }
        current++
      }
      console.log('leftHalf: ', leftHalf)
      console.log('rightHalf: ', rightHalf)
      this.setData({
        leftHalfRecordsOfADOfDeals: leftHalf,
        rightHalfRecordsOfADOfDeals: rightHalf
      })
      this.setData({
        rightHalfRecordsOfADOfComping: leftHalf,
        leftHalfRecordsOfADOfComping: rightHalf
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
    if (this.data.progressOfFetchIdListOfADOfDeals != null) {
      this.data.progressOfFetchIdListOfADOfDeals.Respond(response)
    }
    if (response.GetCode() == Code.OK) {
      // success
      this.setData({
        versionOfADOfDeals: response.version_of_ad_of_deals,
        idListOfADOfDeals: response.id_list_of_ad_of_deals,
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
    if (this.data.progressOfFetchVersionOfADOfDeals != undefined) {
      this.data.progressOfFetchVersionOfADOfDeals.Respond(response)
    }
    if (response.GetCode() == Code.OK) { 
      // success
      this.setData({
        versionOfADOfDeals: response.GetVersionOfADOfDeals(),
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
    if (this.data.progressOfFetchRecordsOfADOfCarousel != undefined) {
      this.data.progressOfFetchRecordsOfADOfCarousel.Respond(response)
    }
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
    if (this.data.progressOfFetchVersionOfADOfCarousel != undefined) {
      this.data.progressOfFetchVersionOfADOfCarousel.Respond(response)
    }
    if (response.GetCode() == Code.OK) { 
      // success
      this.setData({
        versionOfADOfCarousel: response.GetVersionOfADOfCarousel(),
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
    if (this.data.progressOfFetchIdListOfADOfCarousel != undefined) {
      this.data.progressOfFetchIdListOfADOfCarousel.Respond(response)
    }
    if (response.GetCode() == Code.OK) {
      // success
      this.setData({
        versionOfADOfCarousel: response.version_of_ad_of_carousel,
        idListOfADOfCarousel: response.id_list_of_ad_of_carousel,
      })
    } else {
      // error occurs
    }
  },
  onTapDeals() {
    console.log('onTapDeals')
    if (this.data.indexOfSubMenu == Menu.Deals) {
      return
    }
    this.setData({
      indexOfSubMenu: Menu.Deals,
    })
  },
  onTapComping() {
    console.log('onTapComping')
    if (this.data.indexOfSubMenu == Menu.Comping) {
      return
    }
    this.setData({
      indexOfSubMenu: Menu.Comping,
    })
  },
  onTapBarbecue() {
    console.log('onTapBarbecue')
    this.setData({
      indexOfSubMenu:Menu.Barbecue,
    })
  },
  onTapSnacks() {
    console.log('onTapSnacks')
    this.setData({
      indexOfSubMenu:Menu.Snacks,
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