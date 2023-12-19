const { Header } = require("../../../framework/header")
const { PacketClient } = require("../../../framework/packet_client")
const {Major} = require('../../route/major')
const {Runtime} = require('../../../runtime/runtime')
const { Advertisement } = require("../../route/advertisement")
const {FetchVersionOfADOfCarouselReq} = require('../../protocol/advertisement/fetch_version_of_ad_of_carousel')

function FetchVersionOfADOfCarousel({from, caller}) {
  var hdr = new Header()
  var packet = new PacketClient()
  var request = new FetchVersionOfADOfCarouselReq()
  hdr.SetMajor(Major.Advertisement)
  hdr.SetMinor(Advertisement.FetchVersionOfADOfCarouselReq)
  packet.SetHeader(hdr)
  packet.SetBody(request)
  Runtime.Request({from:from, caller:caller, packet: packet})
}

module.exports = {
  FetchVersionOfADOfCarousel
}