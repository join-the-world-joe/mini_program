const {publicKey, privateKey, key, iv, LengthOfVerificationCode, LengthOfPhoneNumber } = require("./setting");

class Config {
  static Debug = true
  static Encryption = true
  static Url = 'ws://127.0.0.1:10002/ws'
  static AESKey = key
  static AESIV = iv
  static RSAPublicKey = publicKey
  static RSAPrivateKey = privateKey
  static LengthOfVerificationCode = LengthOfVerificationCode
  static LengthOfPhoneNumber = LengthOfPhoneNumber

  // storage key
  static KeyOfCarousel = 'carousel'

  // screen
  static PeriodOfScreenInitialisation = 100
  static PeriodOfScreenNormal = 500
}

module.exports = {
  Config
}