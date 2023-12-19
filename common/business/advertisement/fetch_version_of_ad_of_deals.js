const { Header } = require("../../../framework/header")
const { PacketClient } = require("../../../framework/packet_client")
const {Major} = require('../../route/major')
const {Runtime} = require('../../../runtime/runtime')
const { Advertisement } = require("../../route/advertisement")
const {FetchVersionOfADOfDealsReq} = require('../../protocol/advertisement/fetch_version_of_ad_of_deals')

function FetchVersionOfADOfDeals({from, caller}) {
  var hdr = new Header()
  var packet = new PacketClient()
  var request = new FetchVersionOfADOfDealsReq()
  hdr.SetMajor(Major.Advertisement)
  hdr.SetMinor(Advertisement.FetchVersionOfADOfDealsReq)
  packet.SetHeader(hdr)
  packet.SetBody(request)
  Runtime.Request({from:from, caller:caller, packet: packet})
}

module.exports = {
  FetchVersionOfADOfDeals
}