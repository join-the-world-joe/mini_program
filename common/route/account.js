class Account {
  static LoginReq = "1"
  static LoginRsp = "2"
  static LogoutReq = "3"
  static LogoutRsp = "4"
  static RegisterReq = "5"
  static RegisterRsp = "6"
  
  static GetName(input) {
    switch (input) {
      case this.LoginReq:
        return 'LoginReq'
      case this.LoginRsp:
        return 'LoginRsp'
      case this.LoginReq:
        return 'LoginReq'
      case this.LoginRsp:
        return 'LoginRsp'
      case this.RegisterReq:
        return 'RegisterReq'
      case this.RegisterRsp:
        return 'RegisterRsp'
      default:
        return 'unknown'
    }
  }
}

module.exports = {
  Account
}