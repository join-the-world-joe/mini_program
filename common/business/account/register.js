const { Header } = require("../../../framework/header")
const { PacketClient } = require("../../../framework/packet_client")
const { RegisterReq } = require("../../protocol/account/register")
const { Account } = require("../../route/account")
const { Major } = require("../../route/major")
const {Runtime} = require('../../../runtime/runtime')

function Register({from, caller, countryCode, phoneNumber, verificationCode}) {
  var hdr = new Header()
  var packet = new PacketClient()
  var request = new RegisterReq()
  hdr.SetMajor(Major.Account)
  hdr.SetMinor(Account.RegisterReq)
  request.SetPhoneNumber(phoneNumber)
  request.SetCountryCode(countryCode)
  request.SetVerificationCode(verificationCode)
  packet.SetHeader(hdr)
  packet.SetBody(request)
  Runtime.Request({from:from, caller:caller, packet: packet})
}

module.exports = {
  Register
}