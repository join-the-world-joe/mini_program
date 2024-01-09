var {Config} = require('../../../../../config/config')
const { Code } = require('../../../../code/code')
const { FetchRecordsOfADOfDeals } = require('../../business/fetch_records_of_ad_of_deals')

class FetchRecordsOfADOfDealsStep {
  constructor() {
    this._rsp = undefined
    this._from = 'FetchRecordsOfADOfDealsStep'
    this._requested = false
    this._responded = false
    this._requestTime = Date.now()
    this._advertisementIdList = []
  }

  SetAdvertisementIdList(advertisementIdList) {
    this._advertisementIdList = advertisementIdList
  }

  Progress() {
    this._caller = 'progress'
    if (!this._requested) {
      FetchRecordsOfADOfDeals({
        from: this._from,
        caller: this._caller,
        advertisementIdList: this._advertisementIdList,
      })
      this._requestTime = Date.now()
      this._requested = true
    }
    if (this._requested) {
      if (this.timeout()) {
        return Code.ServiceRequestTimeout
      }
      if (this._responded) {
        if (this._rsp != undefined) {
          if (this._rsp.GetCode() == Code.OK) {
            return Code.OK
          }
        }
        return Code.InternalError
      }
    }
    return Code.InternalError * -1
  }

  GetCode() {
    if (this._rsp != undefined) {
      return this._rsp.GetCode()
    }
    if (this.timeout()) {
      return Code.ServiceRequestTimeout
    }
    return Code.InternalError * -1
  }

  Respond(rsp) {
    this._rsp = rsp
    this._responded = true
  }

  timeout() {
    if (!this._responded && (Date.now() - (this._requestTime + Config.DefaultHttpRequestTimeout) > 0)) {
      return true
    }
    return false
  }
}

module.exports = {
  FetchRecordsOfADOfDealsStep
}