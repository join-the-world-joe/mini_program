const { Translator } = require("./common/translator/translator")
const { Runtime } = require("./runtime/runtime")

// app.js
App({
  onLaunch() {
    Translator.Load()
    Runtime.Setup()
  }
})
