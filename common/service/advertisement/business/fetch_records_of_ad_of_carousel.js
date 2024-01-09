const { Header } = require("../../../../framework/header")
const { PacketClient } = require("../../../../framework/packet_client")
const {Major} = require('../../../route/major')
const {Runtime} = require('../../../../runtime/runtime')
const { Advertisement } = require("../../../route/advertisement")
const { FetchRecordsOfADOfCarouselReq } = require('../protocol/fetch_records_of_ad_of_carousel')

function FetchRecordsOfADOfCarousel({from, caller, advertisementIdList}) {
  var hdr = new Header()
  var packet = new PacketClient()
  var request = new FetchRecordsOfADOfCarouselReq()
  hdr.SetMajor(Major.Advertisement)
  hdr.SetMinor(Advertisement.FetchRecordsOfADOfCarouselReq)
  request.SetAdvertisementIdList(advertisementIdList)
  packet.SetHeader(hdr)
  packet.SetBody(request)
  Runtime.Request({from:from, caller:caller, packet: packet})
}

module.exports = {
  FetchRecordsOfADOfCarousel
}