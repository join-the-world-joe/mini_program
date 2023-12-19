class Account {
  static LoginReq = "1"
  static LoginRsp = "2"
  static LogoutReq = "3"
  static LogoutRsp = "4"
  static RegisterReq = "5"
  static RegisterRsp = "6"
  
  static GetName(input) {
    switch (input) {
      case Account.LoginReq:
        return 'LoginReq'
      case Account.LoginRsp:
        return 'LoginRsp'
      case Account.LoginReq:
        return 'LoginReq'
      case Account.LoginRsp:
        return 'LoginRsp'
      case Account.RegisterReq:
        return 'RegisterReq'
      case Account.RegisterRsp:
        return 'RegisterRsp'
      default:
        return 'unknown'
    }
  }
}

module.exports = {
  Account
}