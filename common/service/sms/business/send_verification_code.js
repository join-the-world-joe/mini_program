const { Header } = require("../../../../framework/header")
const { PacketClient } = require("../../../../framework/packet_client")
const { SendVerificationCodeReq } = require("../protocol/send_verification_code")
const {Major} = require('../../../route/major')
const {SMS} = require('../../../route/sms')
const {Runtime} = require('../../../../runtime/runtime')

function SendVerificationCodeOfRegister({from, caller, countryCode, phoneNumber}) {
  var hdr = new Header()
  var packet = new PacketClient()
  var request = new SendVerificationCodeReq()
  hdr.SetMajor(Major.SMS)
  hdr.SetMinor(SMS.SendVerificationCodeReq)
  request.SetBehavior('Register')
  request.SetCountryCode(countryCode)
  request.SetPhoneNumber(phoneNumber)
  packet.SetHeader(hdr)
  packet.SetBody(request)
  Runtime.Request({from:from, caller:caller, packet: packet})
}

function SendVerificationCodeOfLogin({from, caller, countryCode, phoneNumber}) {
  var hdr = new Header()
  var packet = new PacketClient()
  var request = new SendVerificationCodeReq()
  hdr.SetMajor(Major.SMS)
  hdr.SetMinor(SMS.SendVerificationCodeReq)
  request.SetBehavior('Login')
  request.SetCountryCode(countryCode)
  request.SetPhoneNumber(phoneNumber)
  packet.SetHeader(hdr)
  packet.SetBody(request)
  Runtime.Request({from:from, caller:caller, packet: packet})
}

module.exports = {
  SendVerificationCodeOfRegister,
  SendVerificationCodeOfLogin
}