const { Runtime } = require("../../runtime/runtime")

// screen/carousel/carousel.js
Page({

  /**
   * Page initial data
   */
  data: {
    advertisement: undefined,
  },
  addToCart() {
    console.log('addToCart')
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    console.log("advertisement: ", Runtime.GetAdvertisement())
    this.setData({
      advertisement: Runtime.GetAdvertisement()
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