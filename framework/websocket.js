class Websocket {
  constructor() {
    this._socket = null
  }
  SetEncryption(encryption) {
    this._encryption = encryption
  }
  SetURL(url) {
    this._url = url 
  }
  SetOnOpen(onOpen) { // callback in connect phase
    this._onOpen = onOpen
  }
  SetOnSuccess(onSuccess) { // callback in connect phase
    this._onSuccess = onSuccess
  }
  SetOnFial(onFail) { // callback in connect phase
    this._onFail = onFail
  }
  SetOnClose(onClose) {
    this._onClose = onClose
  }
  SetOnError(onError) {
    this._onError = onError
  }
  SetOnMessage(onMessage) {
    this._onMessage = onMessage
  }

  Connect() {
    console.log('Websocket.Connect.url: ', this._url)
    try {
      this._socket = wx.connectSocket({
        url: this._url,
        success: () => this._onSuccess(),
        fail: () => this._onFail(),
      })
    }catch(e) {
      console.log("framework.websocket.Connect failiure, err: ", e)
    }
    finally {
      if(this._socket == null) {
        return 
      }
      this._socket.onOpen(this._onOpen)
      this._socket.onClose(this._onClose)
      this._socket.onError(this._onError)
      this._socket.onMessage(this._onMessage)
    }
  }
  Send(bytes, onSuccess, onFail, onComplete) {
   try {
    this._socket.send({
      data: bytes,
      success: res => {
        onSuccess(res)
      },
      fail: res => {
        onFail(res)
      },
      complete: res => {
        onComplete(res)
      }
    })
   } catch(e) {
    console.log("framework.websocket.Send failiure, err: ", e)
   }
   finally {
    return
   }
  }
}

module.exports = {
  Websocket
}