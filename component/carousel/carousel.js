const { Runtime } = require("../../runtime/runtime")

Component({
  properties: {
    dataMap: {
      type: Object,
      value: {}
    },
  },
  data: {
  },
  methods:{
    tapItem: function(event) {
      console.log("carousel.tapItem, id: ", event.currentTarget.dataset.id, "dataMap: ", this.data.dataMap)
      Runtime.SetAdvertisement(this.data.dataMap[event.currentTarget.dataset.id])
      wx.navigateTo({
        url: "/screen/carousel/carousel",
      })
    }
  }
})