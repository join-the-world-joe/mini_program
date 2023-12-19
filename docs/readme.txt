Directory
asset 资源文件夹
asset/icon 图标文件夹
asset/image 图片文件夹
common 公共文件夹
common/language 语言文件夹
common/translator 翻译器
config 项目配置文件夹
framework 框架
model 数据模型
plugin 插件
runtime 运行时
screen 展示页
utils 工具
validator 校验器

项目规则：
1. 通过utils/Log输出调试信息
2. common/code/code.js 定义系统的错误代码

开发技巧：
1. 有打印代码没打印信息，可能是import log问题
2. 新页面要检查，SetObserve，Observe
3. Observe不用加try catch
4. onLoad检查catch，onReady加loading提示，组件加忽略事件处理
5. 周期性调用process，做例行任务，如echo，续约，心跳，更新配置等


