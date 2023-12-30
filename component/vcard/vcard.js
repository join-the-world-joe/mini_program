const { Advertisement } = require("../../model/advertisement")

Component({
  properties: {
    advertisement: {
      type: Advertisement,
      value: new Advertisement()
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