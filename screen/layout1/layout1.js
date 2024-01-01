// pages/index/index.js

Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    imageUrls: [
      'https://advertisement-image.oss-cn-shenzhen.aliyuncs.com/40/thumbnail-1703952543.jpg',
      'https://advertisement-image.oss-cn-shenzhen.aliyuncs.com/41/thumbnail-1703933407.jpg',
      'https://advertisement-image.oss-cn-shenzhen.aliyuncs.com/43/thumbnail-1703933436.jpg',
    ],
  },
  addToCart(event) {
    const { currentTarget: { dataset: { index } } } = event;
    const selectedGoods = this.data.goodsList[index];
    // 在这里可以实现加入购物车的逻辑，例如向购物车数组中添加商品对象
    console.log(`商品 ${selectedGoods.id} 已加入购物车`);
  },
});
