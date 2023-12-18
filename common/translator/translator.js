const { Chinese } = require("../language/chinese");

class Translator {
  static Native = Chinese.Name

  static SetNative(input) {
    this.Native = input
  }

  static Load() {
    Chinese.Load()
  }

  static Translate(input) {
    if(this.Native.localeCompare(Chinese.Name) == 0) {
      return Chinese.Translate(input)
    }
    return '未知翻译语言';
  }
}

module.exports = {
  Translator
}