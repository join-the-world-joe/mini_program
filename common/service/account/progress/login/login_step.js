
var {Config} = require('../../../../../config/config')
const { Code } = require('../../../../code/code')
const { Login } = require('../../business/login')

class LoginStep {
  constructor() {
    this._rsp = undefined
    this._from = 'LoginStep'
    this._requested = false
    this._responded = false
    this._requestTime = Date.now()

    this.behavior = -1
    this.country_code = undefined
    this.phone_number = undefined
    this.verification_code = undefined
    this.member_id = ""
    this.user_id = -1
  }

  Progress() {
    this._caller = 'LoginStep.progress'
    if (!this._requested) {
      Login({
        from: this._from,
        caller: this._caller,
        countryCode: this.country_code,
        phoneNumber: this.phone_number,
        verificationCode: this.verification_code,
      })
      this._requestTime = Date.now()
      this._requested = true
    }
    if (this._requested) {
      if (this.timeout()) {
        return Code.InternalError
      }
      if (this._responded) {
        if (this._rsp != undefined) {
          if (this._rsp.GetCode() == Code.OK) {
            return Code.OK
          }
        }
        return Code.InternalError
      }
    }
    return Code.InternalError * -1
  }

  GetCode() {
    if (this._rsp != undefined) {
      return this._rsp.GetCode()
    }
    return Code.InternalError * -1
  }

  Respond(rsp) {
    this._rsp = rsp
    this._responded = true
  }

  timeout() {
    if (!this._responded && (Date.now() - (this._requestTime + Config.DefaultHttpRequestTimeout) > 0)) {
      return true
    }
    return false
  }

  SetBehavior(behavior) {
    this.behavior = behavior
  }
  SetCountryCode(countryCode) {
    this.country_code = countryCode
  }
  SetPhoneNumber(phoneNumber) {
    this.phone_number = phoneNumber
  }
  SetVerificationCode(code) {
    this.verification_code = code
  }
  SetMemberId(memberId) {
    this.member_id = memberId
  }
  SetUserId(userId) {
    this.user_id = userId
  }
}

module.exports = {
  LoginStep
}