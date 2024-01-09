const { Runtime } = require("../../runtime/runtime")

Component({
  properties: {
    dataMap: {
      type: Object,
      value: {}
    },
  },
  observers: {
    'dataMap': function (newVal, oldVal) {
      var urlList = new Object()
      for (var e in this.properties.dataMap) {
        urlList[e] = this.properties.dataMap[e].oss_path + this.properties.dataMap[e].image[0].objectFileName
      }
      this.setData({
        UrlListOfCoverImage: urlList,
      })
    }
  },
  data: {
    UrlListOfCoverImage: new Object()
  },
  methods:{
    tapItem: function(event) {
      Runtime.SetAdvertisement(this.data.dataMap[event.currentTarget.dataset.id])
      wx.navigateTo({
        url: "/screen/carousel/carousel",
      })
    }
  }
})