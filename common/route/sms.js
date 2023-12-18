class SMS {
  static SendVerificationCodeReq = "1"
  static SendVerificationCodeRsp = "2"
  static GetName(input) {
    switch (input) {
      case this.SendVerificationCodeReq:
        return 'SendVerificationCodeReq';
      case this.SendVerificationCodeRsp:
        return 'SendVerificationCodeRsp';
      default:
        return 'unknown';
    }
  }
}

module.exports = {
  SMS
}
