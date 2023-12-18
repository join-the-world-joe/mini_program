class Advertisement {
  constructor() {
    this.title = ''
    this.stock = 0
    this.status = 0
    this.sellingPrice = 0
    this.productId = 0
    this.productName = ''
    this.sellingPoints = ['']
    this.image = {} // 0-thumbnail; 1-N, image
    this.placeOfOrigin = ''
    this.advertisementId = 0
    this.advertisementName = ''
  }

  SetTitle(title) {
    this.title = title
  }
  SetStock(stock) {
    this.stock = stock
  }
  SetStatus(status) {
    this.status = status
  }
  SetSellingPrice(sellingPrice) {
    this.sellingPrice = sellingPrice
  }
  SetProductId(productId) {
    this.productId = productId
  }
  SetProductName(productName) {
    this.productName = productName
  }
  SetSellingPoints(sellingPoints) {
    this.sellingPoints = sellingPoints
  }
  SetImage(image) {
    this.image = image
  }
  SetPlaceOfOrigin(placeOfOrigin) {
    this.placeOfOrigin = placeOfOrigin
  }
  SetAdvertisementId(advertisementId) {
    this.advertisementId = advertisementId
  }
  SetAdvertisementName(advertisementName) {
    this.advertisementName = advertisementName
  }
}

module.exports = {
  Advertisement 
}