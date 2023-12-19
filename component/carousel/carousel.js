Component({
  properties: {
    dataMap: {
      type: Object,
      value: {}
    },
  },
  data: {
    thumbnail: {

    }
  },
  methods:{
    tapItem: function(event) {
      console.log(event.currentTarget.dataset.id)
      console.log(this.data.dataMap[1].image[0][0])
    }
  }
})