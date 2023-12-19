const { Chinese } = require("../language/chinese");

class Translator {
  static Native = Chinese.Name

  static SetNative(input) {
    Translator.Native = input
  }

  static Load() {
    Chinese.Load()
  }

  static Translate(input) {
    if(Translator.Native.localeCompare(Chinese.Name) == 0) {
      return Chinese.Translate(input)
    }
    return '未知翻译语言';
  }
}

module.exports = {
  Translator
}