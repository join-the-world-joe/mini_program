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
    }
  }
})