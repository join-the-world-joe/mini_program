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
      console.log(event.currentTarget.dataset.id)
    }
  }
})