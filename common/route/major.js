class Major {
  static FrontendGateway = "1"
  static BackendGateway = "2"
  static Account = "3"
  static SMS = "4"
  static Admin = "5"
  static Inform = "6"
  static Advertisement = "7"

  static GetName(input) {
    switch (input) {
      case this.SMS:
        return 'SMS';
      case this.Admin:
        return 'Admin';
      case this.FrontendGateway:
        return 'FrontendGateway';
      case this.BackendGateway:
        return 'BackendGateway';
      case this.Account:
        return 'Account';
      case this.Inform:
        return 'Inform';
      case this.Advertisement:
        return 'Advertisement'
      default:
        return 'unknown';
    }
  }
}

module.exports = {
  Major
}