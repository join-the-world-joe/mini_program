class ImageItem {
  constructor() {
    this.width = 0
    this.height = 0
    this.objectFileName = ''
  }
  GetWidth() {
    return this.width
  }
  GetHeight() {
    return this.height
  }
  GetObjectFileName() {
    return this.objectFileName
  }
  static FromJson(json) {
    var temp = JSON.parse(json)
    var that = new ImageItem()
    try {
      if (temp != undefined) {
        if (temp['width'] != undefined) {
          that.width = temp['width']
        }
        if (temp['height'] != undefined) {
          that.height = temp['height']
        }
        if (temp['object_file_name'] != undefined) {
          that.objectFileName = temp['object_file_name']
        }
      }
    } catch(e) {
      console.log('ImageItem.FromJson failure, err: ', e)
    }
    return that
  }
}

module.exports = {
  ImageItem
}