var {AttempToLogin} = require('../../../../../common/language/language')
var {Translator} = require('../../../../../common/translator/translator')
const { Runtime } = require('../../../../../runtime/runtime')
const { Config } = require('../../../../../config/config')
const { Code } = require('../../../../code/code')

class FetchIdListOfADOfCarouselProgress {
  constructor({step, onSuccess, onFailure}) {
    this._message = ''
    this._step = step
    this._code = Code.InternalError * -1
    this._onSuccess = onSuccess
    this._onFailure = onFailure
    this._initialized = false
  }
  Respond(rsp) {
    this._step.Respond(rsp)
  }
  Progress() {
    return this._step.Progress()
  }
  progress() {
    var code = this._step.Progress()
    if (code == Code.InternalError || code == Code.OK) { 
      if (code == Code.OK) {
        // success
        this._onSuccess()
      } else {
        // failure
        this._onFailure()
      }
      Runtime.SetPeriod(Config.PeriodOfScreenNormal)
      Runtime.SetPeriodc(undefined)
      wx.hideLoading()
    }
  }
  setup() {
    Runtime.SetPeriod(Config.PeriodOfScreenInitialisation)
    Runtime.SetPeriodc(this.progress.bind(this))
  }
  Show() {
    if (!this._initialized) {
      wx.showLoading({
        title: this._message,
        mask: true,
      })
      this.setup()
      this._initialized = true
    }
    return this._step.GetCode()
  }
}

module.exports = {
  FetchIdListOfADOfCarouselProgress
}