const { Carousel } = require('../../cache/carousel')
const { FetchIdListOfADOfCarousel } = require('../../common/business/advertisement/fetch_id_list_of_ad_of_carousel')
const { Config } = require('../../config/config')
const { Major } = require("../../common/route/major")
const { Advertisement } = require('../../common/route/advertisement')
const { Runtime } = require("../../runtime/runtime")
const { Log } = require("../../utils/log")

Page({

  /**
   * Page initial data
   */
  data: {
    from: 'home',
    hideCarousel: true,
    versionOfCarousel: 0,
    idListOfCarousel: [],
    recordsOfCarousel: new Object(), // key: advertisement id, value: advertisement name
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
      
      if(major == Major.Advertisement && minor == Advertisement.FetchIdListOfADOfCarouselRsp) {
        console.log('FetchIdListOfADOfCarouselRsp')
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
    Runtime.SetObserve(this.observe)
    var caller = 'onLoad'
    // try to read the cache of carousel from local storage
    var raw = wx.getStorageSync(Config.KeyOfCarousel)
    if (raw.length <= 0) {
      // no cache in storage yet
      FetchIdListOfADOfCarousel({from:this.data.from, caller:caller})
      return
    }

    // console.log('version_of_carousel: ', versionOfCarousel)

    // var json = `{0:'https://advertisement-image.oss-cn-shenzhen.aliyuncs.com/1/2.jpg
    // ', 1:'image1', 2:'image2'}`
    // var image1 = `https://advertisement-image.oss-cn-shenzhen.aliyuncs.com/1/2.jpg
    // `
    // var image2 = `https://advertisement-image.oss-cn-shenzhen.aliyuncs.com/1/1.jpg
    // `
    // var advertisement1 = new Advertisement();
    // var advertisement2 = new Advertisement();
    // advertisement1.SetImage({0:image1})
    // advertisement1.SetAdvertisementId(1)
    // advertisement2.SetImage({0:image2})
    // advertisement2.SetAdvertisementId(2)
    // var dataMap = new Object()
    // dataMap[1] = advertisement1
    // dataMap[2] = advertisement2
    // this.setData({
    //   recordsOfCarousel:dataMap
    // })
    // console.log(dataMap)
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {
    if (this.data.hideCarousel) {
      wx.showLoading({
        title: '加载中',
      })
    }
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