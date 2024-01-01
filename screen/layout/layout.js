// pages/index/index.js

Page({
  data: {
    currentIndex: 0,
    imageList: [
      'https://advertisement-image.oss-cn-shenzhen.aliyuncs.com/44/thumbnail-1703933453.png',
      'https://advertisement-image.oss-cn-shenzhen.aliyuncs.com/44/1703953105.jpg',
      'https://advertisement-image.oss-cn-shenzhen.aliyuncs.com/41/thumbnail-1703933407.jpg',
    ],
  },

  swiperChange: function (event) {
    this.setData({
      currentIndex: event.detail.current,
    });
  },
});
