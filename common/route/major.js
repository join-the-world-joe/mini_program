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
      case Major.SMS:
        return 'SMS';
      case Major.Admin:
        return 'Admin';
      case Major.FrontendGateway:
        return 'FrontendGateway';
      case Major.BackendGateway:
        return 'BackendGateway';
      case Major.Account:
        return 'Account';
      case Major.Inform:
        return 'Inform';
      case Major.Advertisement:
        return 'Advertisement'
      default:
        return 'unknown';
    }
  }
}

module.exports = {
  Major
}