const { Header } = require("../../../../framework/header")
const { PacketClient } = require("../../../../framework/packet_client")
const {Major} = require('../../../route/major')
const {Runtime} = require('../../../../runtime/runtime')
const { Advertisement } = require("../../../route/advertisement")
const {FetchIdListOfADOfCarouselReq} = require('../protocol/fetch_id_list_of_ad_of_carousel')
function FetchIdListOfADOfCarousel({from, caller}) {
  var hdr = new Header()
  var packet = new PacketClient()
  var request = new FetchIdListOfADOfCarouselReq()
  hdr.SetMajor(Major.Advertisement)
  hdr.SetMinor(Advertisement.FetchIdListOfADOfCarouselReq)
  packet.SetHeader(hdr)
  packet.SetBody(request)
  Runtime.Request({from:from, caller:caller, packet: packet})
}

module.exports = {
  FetchIdListOfADOfCarousel
}