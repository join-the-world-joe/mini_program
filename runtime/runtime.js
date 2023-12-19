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
  static websocketInitialisationRequested = false
  static lastWebsocketInitialisationRequestTime = undefined
  static connectivity = false
  static defaultPeriod = 1000
  static websock = new Websocket()
  static period = 1000
  static _periodic = undefined
  static periodicInitialisationRequested = false

  static Setup() {
    try{
      if (!Runtime.websocketInitialisationRequested) {
        Runtime.websocketInitialisationRequested = true
        Runtime.lastWebsocketInitialisationRequestTime = Date.now()
        Runtime.websock.SetURL(Config.Url)
        Runtime.websock.SetOnOpen((result) => {
          // callback in connect phase
          console.log("Runtime.Websocket.onOpen")
          Runtime.connectivity = true
        })
        Runtime.websock.SetOnSuccess(() => {
          // callback in connect phase
          console.log("Runtime.Websocket.OnSuccess")
        }) 
        Runtime.websock.SetOnFial( ()=>{
          // callback in connect phase
          console.log("Runtime.Websocket.OnSuccess")
          Runtime.connectivity = false
        })
        Runtime.websock.SetOnClose(() => {
          console.log("Runtime.Websocket.OnClose")
          Runtime.connectivity = false
        })
        Runtime.websock.SetOnError(() => {
          console.log("Runtime.Websocket.OnError")
        })
        Runtime.websock.SetOnSuccess(() => {
          console.log("OnSuccess")
          Runtime.connectivity = true
        })
        Runtime.websock.SetOnMessage((input) => Runtime.onMessage(input))
        // connect to remote websocket server
        Runtime.websock.Connect()
      }
      if (!Runtime.periodicInitialisationRequested) {
        Runtime.periodicInitialisationRequested = true
        Runtime.periodic()
      }
      return
    } catch(e) {
      console.log("runtime.Setup failure, err: ", e)
    }
    finally {
      return
    }
  }

  static periodic() {
    try {
      // console.log('periodic')
      if (Runtime._periodic != undefined) {
        Runtime._periodic.call()
      } else {
        // console.log('_periodic is undefined')
      }
    } catch(e) {
      console.log('Runtime.periodic failure, err: ', e)
    } finally {
      setTimeout(Runtime.periodic, Runtime.period)
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
      if (Runtime.observe != null) {
        // console.log('runtime caller observe')
        Runtime.observe(packet)
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
    if (Runtime.rateLimiting[key] == null) {
      var limiter = new RateLimiter()
      limiter.SetMajor(major)
      limiter.SetMinor(minor)
      Runtime.rateLimiting[key] = limiter
      return  Runtime.rateLimiting[key].allow()
    }
    return Runtime.rateLimiting[key].allow()
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
      var permitted = Runtime.Allow(packet.GetHeader().GetMajor(), packet.GetHeader().GetMinor())
        console.log('major:', packet.GetHeader().GetMajor(), 'minor:', packet.GetHeader().GetMinor(), 'permitted: ', permitted)
      
        // return
      // if(!Runtime._initialized || !Runtime._connectivity) {
      //   Runtime.Setup()
      // }
      
      if (Config.Encryption) {
        output = AES.Encrypt(output)
      }

      Runtime.websock.Send(
        output, 
        (res) => Runtime.onRequestSuccess(res),
        (res) => Runtime.onRequestFailure(res),
        (res) => Runtime.onRequestComplete(res),
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
    Runtime.observe = observe
  }
  static GetObserve() {
    return Runtime.observe
  }
  static SetPeriod(period) {
    Runtime.period = period
  }
  static GetPeriod() {
    return Runtime.period
  }
  static SetPeriodc(periodic) {
    Runtime._periodic = periodic
  }
  static GetPeriodic() {
    return Runtime._periodic
  }
}

module.exports = {
  Runtime
}