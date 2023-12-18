import WxmpRsa from 'wxmp-rsa'
import { Config } from '../../config/config'

class RSA {
  static publicKey = Config.RSAPublicKey
  static privateKey = Config.RSAPrivateKey

  static encrypt(plainText) {
    var _crypto = new WxmpRsa()
    _crypto.setPublicKey(this.publicKey)
    return _crypto.encryptLong(plainText)
  }
  static decrypt(cipherText) {
    var _crypto = new WxmpRsa()
    _crypto.setPrivateKey(this.privateKey)
    return _crypto.decryptLong(cipherText)
  }
}

module.exports = {
  RSA,
}