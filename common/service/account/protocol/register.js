const { Code } = require("../../../code/code")

class RegisterReq {
  constructor() {
    this.country_code = ''
    this.phone_number = ''
    this.verification_code = ''
  }
  SetCountryCode(countryCode) {
    this.country_code = countryCode
  }
  SetVerificationCode(verificationCode) {
    this.verification_code = verificationCode
  }
  SetPhoneNumber(phoneNumber) {
    this.phone_number = phoneNumber
  }
}

class RegisterRsp {
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
  RegisterReq,
  RegisterRsp
}