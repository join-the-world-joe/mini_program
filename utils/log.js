const { Route } = require("../common/route/route")
const { Config } = require("../config/config")

class Log {
  static Debug({major, minor, from, caller, message}) {
    if (Config.Debug) {
      var key = '(' + Route.GetKey({major:major,minor:minor}) + ':' + major + '-' + minor + ')'    
      console.log(from + '.' + caller + key + ':' + message)
    }
  }
  static Warn({from, caller, message}) {  
    console.log(from + '.' + caller  + ':' + message)
  }
}

module.exports = {
  Log
}