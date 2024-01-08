// pages/index/index.js

Page({
  data: {
    categories: [
      { id: 1, name: '水果' },
      { id: 2, name: '蔬菜' },
      // 添加更多分类项
    ],
    products: [
      { id: 1, categoryId: 1, name: '苹果', price: 5.99, image: 'https://advertisement-image.oss-cn-shenzhen.aliyuncs.com/6077aef1-3064-4d80-935b-bf2827e18cc0/0-1704602315.png' },
      { id: 2, categoryId: 1, name: '香蕉', price: 3.99, image: 'https://advertisement-image.oss-cn-shenzhen.aliyuncs.com/6077aef1-3064-4d80-935b-bf2827e18cc0/2-1704602384.jpg' },
      // 添加更多商品项
    ],
    selectedCategoryId: 1, // 默认选中的分类ID
  },

  onLoad: function () {
    this.setData({
      selectedProducts: this.getProductsByCategoryId(this.data.selectedCategoryId),
    });
    wx.showLoading({
      title: 'title',
      mask: true,
    })
  },

  selectCategory: function (e) {
    const categoryId = e.currentTarget.dataset.categoryId;
    this.setData({
      selectedCategoryId: categoryId,
      selectedProducts: this.getProductsByCategoryId(categoryId),
    });
  },

  getProductsByCategoryId: function (categoryId) {
    return this.data.products.filter(product => product.categoryId === categoryId);
  },
});
