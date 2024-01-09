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
  static FromJson(json) { 
    var that = new SendVerificationCodeRsp()
    if (json != undefined) {
      if (json.code != undefined) {
        that._code = json.code
      }
    }
    return that
  }
}

module.exports = {
  SendVerificationCodeReq,
  SendVerificationCodeRsp,
}