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
      console.log(event.currentTarget.dataset.id)
    }
  }
})