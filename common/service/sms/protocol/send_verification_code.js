const { Code } = require("../../../code/code")

class SendVerificationCodeReq {
  constructor() {
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
}

class SendVerificationCodeRsp {
  constructor() {
    this._code = Code.InternalError
  }
  GetCode() {
    return this._code
  }
  FromJson(json) { 
    if (json != undefined) {
      if (json.code != undefined) {
        this._code = json.code
      }
    }
    return this
  }
}

module.exports = {
  SendVerificationCodeReq,
  SendVerificationCodeRsp,
}