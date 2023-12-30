const { Advertisement } = require("../../model/advertisement")

Component({
  properties: {
    advertisement: {
      type: Advertisement,
      value: new Advertisement()
    },
  },
  data: {
    imageWidth: 0,
    imageHeight: 0,
  },
  methods:{
    tapItem: function(event) {
      console.log(event.currentTarget.dataset.id)
    },
    loadImage: function(e) {
      const width = e.detail.width;
      const height = e.detail.height;

      console.log("image width: ", width)
      console.log("image height: ", height)

      // 根据需要设置图片的最终大小
      const maxWidth = 200; // 设置最大宽度
      const scale = maxWidth / width; // 计算缩放比例
      const finalWidth = width * scale; // 计算最终宽度
      const finalHeight = height * scale; // 计算最终高度

      // 更新数据
      this.setData({
        imageWidth: finalWidth,
        imageHeight: finalHeight,
      });
    }
  }
})