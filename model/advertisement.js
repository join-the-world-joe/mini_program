const { Config } = require('../config/config')
const {base64_decode} = require('../plugin/base64/base64')
const {ImageItem} = require('../local/image_item')
const { ImageOrder } = require('../common/macro/image_order')

class Advertisement {
  constructor() {
    this.title = ''
    this.stock = 0
    this.status = 0
    this.oss_path = ''
    this.selling_price = 0
    this.product_id = 0
    this.product_name = ''
    this.selling_points = ['']
    this.image = {} // 0-cover; 1-N, image
    this.place_of_origin = ''
    this.advertisement_id = 0
    this.advertisement_name = ''
  }

  static FromJson(json) {
    var that = new Advertisement()
    if (json != undefined) {
      if (json.title != undefined) {
        that.title = json.title
      }
      if (json.oss_path != undefined) {
        that.oss_path = json.oss_path
      }
      if (json.stock != undefined) {
        that.stock = json.stock
      }
      if (json.advertisement_id != undefined) {
        that.advertisement_id = json.advertisement_id
      }
      if (json.advertisement_name != undefined) {
        that.advertisement_name = json.advertisement_name
      }
      if (json.status != undefined) {
        that.status = json.status
      }
      if (json.selling_price != undefined) {
        that.selling_price = json.selling_price
      }
      if (json.product_id != undefined) {
        that.product_id = json.product_id
      }
      if (json.product_name != undefined) {
        that.product_name = json.product_name
      }
      if (json.selling_points != undefined) {
        var sellingPoints = []
        for(var i = 0; i<json.selling_points.length; i++) {
          sellingPoints[i] = base64_decode(json.selling_points[i])
        }
        that.selling_points = sellingPoints
      }
      for (var i = 0; i < 1; i++) {
        if (json.cover_image != undefined) {
          that.image[ImageOrder.CoverImage] = ImageItem.FromJson(json.cover_image)
        }
        if (json.first_image != undefined) {
          that.image[ImageOrder.FirstImage] = ImageItem.FromJson(json.first_image)
        }
        if (json.second_image != undefined) {
          if (json.second_image.length <= 0) {
            continue
          }
          that.image[ImageOrder.SecondImage] = ImageItem.FromJson(json.second_image)
          if (json.third_image != undefined) {
            if (json.third_image.length <= 0) {
              continue
            }
            that.image[ImageOrder.ThirdImage] = ImageItem.FromJson(json.third_image)
            if (json.fourth_image != undefined) {
              if (json.fourth_image.length <= 0) {
                continue
              }
              that.image[ImageOrder.FourthImage] = ImageItem.FromJson(json.fourth_image)
              if (json.fifth_image != undefined) {
                if (json.fifth_image.length <= 0) {
                  continue
                }
                that.image[ImageOrder.FifthImage] = ImageItem.FromJson(json.fifth_image)
              }
            }
          }
        }
      }
      if (json.place_of_origin != undefined) {
        that.place_of_origin = json.place_of_origin
      }
    }
    return that
  }
}

module.exports = {
  Advertisement 
}