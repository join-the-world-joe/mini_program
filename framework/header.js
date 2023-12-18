class Header {
  constructor() {
    this.major = ""
    this.minor = ""
  }
  SetMajor(major) {
    this.major = major
  }
  GetMajor() {
    return this.major
  }
  SetMinor(minor) {
    this.minor = minor
  }
  GetMinor() {
    return this.minor
  }
  FromJson(json) {
    try {
      this.major = json.major
      this.minor = json.minor
    } catch(e) {
      console.log('Header.FromJson failure, err: ', e)
    } finally {
      return this
    }
  }
}
module.exports = {
  Header
}