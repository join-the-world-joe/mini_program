const { Code } = require('../common/code/code');
const { Config } = require('../config/config')
const { FetchVersionOfADOfDealsRsp } = require('../common/protocol/advertisement/fetch_version_of_ad_of_deals');
const { FetchVersionOfADOfDeals } = require('../common/service/advertisement/business/fetch_version_of_ad_of_deals');

class FetchVersionOfADOfDealsProgress {
  constructor(from) {
    this._from = from
    this._caller = 'FetchVersionOfADOfDealsProgress'
    this._requestd = false
    this._responded = false
    this._requestTime = undefined
    this._rsp = new FetchVersionOfADOfDealsRsp()
  }
  Skip() {
    this._rsp.code = Code.OK
    this._requestd = true
    this._responded = true
  }
  timeout() {
    if (!this._responded && (Date.now() - this._requestTime) >  Config.DefaultHttpRequestTimeout) {
      return true;
    }
    return false;
  }
  Respond(rsp) {
    // console.log('respond: ', rsp)
    this._rsp = rsp
    this._responded = true
  }
  Progress() {
    if(!this._requestd) {
      // business logic
      FetchVersionOfADOfDeals({from:this._from, caller: this._caller})
      this._requestTime = Date.now()
      this._responded = false
      this._rsp = undefined
      this._requestd = true
    }
    if (this._requestd) {
      if (this.timeout()) {
        return Code.ServiceRequestTimeout;
      }
      if (this._responded) {
        if (this._rsp != undefined) {
          if (this._rsp.GetCode() == Code.OK) {
            return Code.OK;
          }
        }
        return Code.InternalError
      }
    }
    return Code.InternalError * -1
  }
}

module.exports = {
  FetchVersionOfADOfDealsProgress
}