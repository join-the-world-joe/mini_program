Page({
  data: {
    animationData: {}
  },

  fadeOut: function () {
    let animation = wx.createAnimation({
      duration: 500, // 过渡时间
      timingFunction: 'ease-in-out', // 缓动函数，可根据需要调整
    });

    // 设置淡出效果
    animation.opacity(0).step();

    this.setData({
      animationData: animation.export()
    });
  }
});
