const {base64_decode} = require('../plugin/base64/base64')

class Advertisement {
  constructor() {
    this.title = ''
    this.stock = 0
    this.status = 0
    this.selling_price = 0
    this.product_id = 0
    this.product_name = ''
    this.selling_points = ['']
    this.image = {} // 0-thumbnail; 1-N, image
    this.place_of_origin = ''
    this.advertisement_id = 0
    this.advertisement_name = ''
  }

  FromJson(json) {
    if (json.title != undefined) {
      this.title = json.title
    }
    if (json.stock != undefined) {
      this.stock = json.stock
    }
    if (json.advertisement_id != undefined) {
      this.advertisement_id = json.advertisement_id
    }
    if (json.advertisement_name != undefined) {
      this.advertisement_name = json.advertisement_name
    }
    if (json.status != undefined) {
      this.status = json.status
    }
    if (json.selling_price != undefined) {
      this.selling_price = json.selling_price
    }
    if (json.product_id != undefined) {
      this.product_id = json.product_id
    }
    if (json.product_name != undefined) {
      this.product_name = json.product_name
    }
    if (json.selling_points != undefined) {
      var sellingPoints = []
      for(var i=0; i<json.selling_points.length; i++) {
        sellingPoints[i] = base64_decode(json.selling_points[i])
      }
      this.selling_points = sellingPoints
    }
    if (json.image != undefined) {
      var obj = JSON.parse(json.image)
      for (const key in obj) {
        // console.log('obj[key]:', obj[key])
        this.image[key] = obj[key]
      }
    }
    if (json.place_of_origin != undefined) {
      this.place_of_origin = json.place_of_origin
    }
    return this
  }
}

module.exports = {
  Advertisement 
}