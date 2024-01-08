const { LoginRsp } = require('../../protocol/login')
var {LoginStep} = require('./login_step')
var {AttempToLogin} = require('../../../../../common/language/language')
var {Translator} = require('../../../../../common/translator/translator')
const { Runtime } = require('../../../../../runtime/runtime')
const { Config } = require('../../../../../config/config')
const { Code } = require('../../../../code/code')

class LoginProgress {
  constructor({step, onSuccess, onFailure}) {
    this._message = Translator.Translate(AttempToLogin)
    this._step = step
    this._code = Code.InternalError * -1
    this._onSuccess = onSuccess
    this._onFailure = onFailure
  }
  Respond(rsp) {
    this._step.Respond(rsp)
  }
  Progress() {
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
    Runtime.SetPeriodc(this.Progress.bind(this))
  }
  Show() {
      wx.showLoading({
        title: this._message,
        mask: true,
      })
      this.setup()
  }
}

module.exports = {
  LoginProgress
}