var _crypto = require('./crypto');
const { Config } = require('../../config/config');
const {Convert} = require('../../utils/convert')

class AES {
  static key = _crypto.enc.Utf8.parse(Config.AESKey)
  static iv = _crypto.enc.Utf8.parse(Config.AESIV)

  static Decrypt(cipherText) {
    var output = ""
    try {
      var temp =  wx.arrayBufferToBase64(cipherText)
      var decrypted = _crypto.AES.decrypt(temp, AES.key, {
        iv: AES.iv,
        mode: _crypto.mode.CBC,
        padding: _crypto.pad.Pkcs7
      });
      output =  _crypto.enc.Utf8.stringify(decrypted).toString();
    } catch(e) {
      console.log("AES.decrypt failure, err: ", e)
    }
    finally {
      return output
    }
  }

  static Encrypt(plainText) {
    var output = Uint8Array.from([])
    try{
      var encrypted = _crypto.AES.encrypt(plainText, AES.key, {
        iv: AES.iv,
        mode: _crypto.mode.CBC,
        padding: _crypto.pad.Pkcs7
      });
      output = Convert.StringToUint8Array(encrypted.ciphertext.toString())
    } catch(e) {
      console.log("AES.encrypt failure, err: ", e)
    }
    finally {
      return output
    }
  }
}

module.exports = {
  AES
}