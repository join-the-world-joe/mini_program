class RateLimiter {
  constructor(){
    this._last = null
    this._major = ""
    this._minor = ""
    // this._period = 1000 //by default 1 seconds
    this._period = 1000
  }
  SetMajor(major) {
    this._major = major
  }
  SetMinor(minor) {
    this._minor = minor
  }
  SetPeriod(period) {
    this._period = period
  }
  allow() {
    if (this._last == null) {
      this._last = Date.now()
      return true
    } else {
      if (Date.now() - (this._last + this._period) > 0) {
        this._last = Date.now()
        return true
      }
      return false
    }
  }
}

module.exports = {
  RateLimiter
}