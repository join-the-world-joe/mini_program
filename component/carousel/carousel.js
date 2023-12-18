Component({
  properties: {
    dataMap: {
      type: Object,
      value: {}
    },
  },
  methods:{
    tapItem: function(event) {
      console.log(event.currentTarget.dataset.id)
    }
  }
})