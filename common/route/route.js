const { Account } = require("./account");
const { Advertisement } = require("./advertisement");
const { Major } = require("./major");
const {SMS} = require('./sms')

class Route {
  static GetKey({major, minor}) {
    switch(major) {
      case Major.SMS:
        return Major.GetName(major) + '.' + SMS.GetName(minor)
      case Major.Account:
        return Major.GetName(major) + '.' + Account.GetName(minor)
      case Major.Advertisement:
        return Major.GetName(major) + '.' + Advertisement.GetName(minor)
      default:
        return 'unknown' + '.' +'unknown'
    }
  }
}

module.exports = {
  Route
}