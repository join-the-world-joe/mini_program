const { Code } = require("../../code/code")

class LoginReq {
  constructor() {
    this.behavior = -1
    this.country_code = ""
    this.phone_number = ""
    this.verification_code = 1111
    this.member_id = ""
    this.user_id = -1
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


class LoginRsp {
  constructor() {
    this._user_id = -1
    this._member_id = ""
    this._secret = ""
    this._code = Code.InternalError
  }
  GetCode() {
    return this._code
  }
  GetUserId() {
    return this._user_id
  }
  GetMemberId() {
    return this._member_id
  }
  GetSecret() {
    return this._secret
  }
  FromJson(json) { // modify itself
    try {
      // console.log('Login.Response.FromJson.json: ', json)
      if (json != undefined) {
        if (json.code != undefined) {
          this._code = json.code
          this._user_id = json.user_id
          this._member_id = json.member_id
          this._secret = json.secret
        }
      }
    } catch(e) {
      console.log('PacketClient.FromJson failure, err: ', e)
    } finally {
      return this
    }
  }
}

module.exports = {
  LoginReq,
  LoginRsp
}