const { Header } = require("../../../../framework/header")
const { PacketClient } = require("../../../../framework/packet_client")
const {Account} = require('../../../route/account')
const {Major} = require('../../../route/major')
const {Runtime} = require('../../../../runtime/runtime')
const { LoginReq } = require("../protocol/login")

function Login({from, caller, countryCode, phoneNumber, verificationCode}) {
  var hdr = new Header()
  var packet = new PacketClient()
  var request = new LoginReq()
  hdr.SetMajor(Major.Account)
  hdr.SetMinor(Account.LoginReq)
  request.SetBehavior(2)
  request.SetCountryCode(countryCode)
  request.SetPhoneNumber(phoneNumber)
  request.SetVerificationCode(verificationCode)
  packet.SetHeader(hdr)
  packet.SetBody(request)
  Runtime.Request({from:from, caller:caller, packet: packet})
}

module.exports = {
  Login
}