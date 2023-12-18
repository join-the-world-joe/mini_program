const { Config } = require("../config/config")
const { PacketClient } = require("../framework/packet_client")
const { RateLimiter } = require('../framework/rate_limiter')
const { Websocket } = require("../framework/websocket")
const { AES } = require("../plugin/crypto/aes")
const { Convert } = require("../utils/convert")
const { Log } = require("../utils/log")

class Runtime {
  static from = 'Runtime'
  static token = ''
  static observe = null
  static rateLimiting = {}
  static initialized = false
  static connectivity = false
  static defaultPeriod = 1000
  static websock = new Websocket()

  static Setup() {
    try{
      if (!this._initialized) {
        this.websock.SetURL(Config.Url)
        this.websock.SetOnOpen((result) => {
          // callback in connect phase
          console.log("Runtime.Websocket.onOpen")
        })
        this.websock.SetOnSuccess(() => {
          // callback in connect phase
          console.log("Runtime.Websocket.OnSuccess")
          this._initialized = true
          this._connectivity = true
        }) 
        this.websock.SetOnFial( ()=>{
          // callback in connect phase
          console.log("Runtime.Websocket.OnSuccess")
          this._initialized = false
          this._connectivity = false
        })
        this.websock.SetOnClose(() => {
          console.log("Runtime.Websocket.OnClose")
          this._connectivity = false
        })
        this.websock.SetOnError(() => {
          console.log("Runtime.Websocket.OnError")
        })
        this.websock.SetOnSuccess(() => {
          console.log("OnSuccess")
          this._connectivity = true
        })
        this.websock.SetOnMessage((input) => this.onMessage(input))
        // connect to remote websocket server
        this.websock.Connect()
        return
      }
      return
    } catch(e) {
      console.log("runtime.Setup failure, err: ", e)
    }
    finally {
      return
    }
  }

  static onMessage(input) {
    try{
      var packet = new PacketClient()
      if (Config.Encryption) {
        packet.FromJson(AES.Decrypt(new Uint8Array(input.data)))
      } else {
        packet.FromJson(Convert.Int8ArrayToString(new Int8Array(input.data)))
      }
      console.log('onMessage: ', packet)
      if (this.observe != null) {
        console.log('runtime caller observe')
        this.observe(packet)
        return
      }
      console.log('Runtime.Websocket.OnMessage.Warning, drop: ', packet)
    } catch(e) {
      console.log("runtime.Setup.OnMessage failure, err: ", e)
    } finally {
      return
    }
  }

  static Allow(major, minor) {
    const key = major + '-' + minor
    if (this.rateLimiting[key] == null) {
      var limiter = new RateLimiter()
      limiter.SetMajor(major)
      limiter.SetMinor(minor)
       this.rateLimiting[key] = limiter
      return  this.rateLimiting[key].allow()
    }
    return this.rateLimiting[key].allow()
  }
  
  static onRequestSuccess(res) {
    // console.log("Runtime.onRequestSuccess")
  }

  static onRequestFailure(res) {
    console.log("Runtime.onRequestFailure", res)
  }

  static onRequestComplete(res) {
    // console.log("Runtime.onRequestComplete")
  }

  static Request({packet, from, caller}) {
    var output = packet.ToJson()
    try{
      var permitted = this.Allow(packet.GetHeader().GetMajor(), packet.GetHeader().GetMinor())
        console.log('major:', packet.GetHeader().GetMajor(), 'minor:', packet.GetHeader().GetMinor(), 'permitted: ', permitted)
      
        // return
      // if(!this._initialized || !this._connectivity) {
      //   this.Setup()
      // }
      
      if (Config.Encryption) {
        output = AES.Encrypt(output)
      }

      this.websock.Send(
        output, 
        (res) => this.onRequestSuccess(res),
        (res) => this.onRequestFailure(res),
        (res) => this.onRequestComplete(res),
      )
      Log.Debug({
        major: packet.GetHeader().GetMajor(),
        minor: packet.GetHeader().GetMinor(),
        from: from,
        caller: caller,
        message: 'requested',
     })
      return
    } catch(e) {
      console.log("Runtime.SendRequest failure, err: ", e)
      return
    }
    finally {
      return 
    }
  }
  static SetObserve(observe) {
    this.observe = observe
  }
  static GetObserve() {
    return this.observe
  }
}

module.exports = {
  Runtime
}