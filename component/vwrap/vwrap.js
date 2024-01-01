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
      console.log("vwrap.tapItem, id:", event.currentTarget.dataset.id)
      wx.navigateTo({
        url: '/screen/carousel/carousel',
      })
    }
  }
})