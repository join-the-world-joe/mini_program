const { Runtime } = require("../../runtime/runtime")

Component({
  properties: {
    leftSideDataMap: {
      type: Object,
      value: {}
    },
    rightSideDataMap: {
      type: Object,
      value: {}
    },
  },
  data: {
  },
  methods:{
    tapItem: function(event) {
      var advertisementId = event.currentTarget.dataset.id
      console.log("vwrap.tapItem, id:", advertisementId)
      if (this.data.leftSideDataMap[advertisementId] != undefined) {
        Runtime.SetAdvertisement(this.data.leftSideDataMap[advertisementId])
      } else {
        Runtime.SetAdvertisement(this.data.rightSideDataMap[advertisementId])
      }
      
      wx.navigateTo({
        url: '/screen/carousel/carousel',
      })
    }
  }
})