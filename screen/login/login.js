const {TitleOfSendSMSButton, TitleOfClick, TitleOfRegisterButton,TitleOfLoginButton, TipOfPlaceholderOfInputOfVerificationCode,TipOfPlaceholderOfInputOfPhoneNumber, TitleOfVerificationCode, TitleOfVerificationCodeLoginScreen, TitleOfPhoneNumber, TitleOfGuess, TitleOfPlease,TitleOfNotification,IllegalPhoneNumber, IllegalVerificationCode,phoneNumberNotRegisteredYet } = require("../../common/language/language")
const { Major } = require("../../common/route/major")
const { SMS } = require("../../common/route/sms")
const { Translator } = require("../../common/translator/translator")
const { Config } = require("../../config/config")
const { Log } = require("../../utils/log")
const {SendVerificationCodeRsp} = require('../../common/service/sms/protocol/send_verification_code')
const { SendVerificationCodeOfLogin } = require("../../common/service/sms/business/send_verification_code")
const { Runtime } = require("../../runtime/runtime")
const { Account } = require("../../common/route/account")
const { Code } = require("../../common/code/code")
const {Login} = require('../../common/service/account/business/login')
const { LoginRsp } = require("../../common/service/account/protocol/login")
const { LoginStep } = require("../../common/service/account/progress/login/login_step")
const { LoginProgress } = require("../../common/service/account/progress/login/login_progress")

Page({
  data: {
    from: 'login',
    hide: false,
    phoneNumber: '18620283370',
    verificationCode: '',
    titleOfLoginButton: '',
    countdownNumber: 60,
    submitButtonDisabled: true,
    title:'',
    verificationCodeRequested: false,
    titleOfPhoneNumber:'',
    titleOfVerificationCode:'',
    tipOfPlaceholderOfInputOfPhoneNumber:'',
    tipOfPlaceholderOfInputOfVerificationCode:'',
    titleOfRegisterButton:'',
    titleOfGuess: '',
    titleOfPlease: '',
    titleOfClick: '',
    lengthOfVerificationCode: 0,
    lengthOfPhoneNumber: 0,
    smsButtonLabel:'',

    loginProgress: undefined,
  },
  navigate_to_register() {
    wx.navigateTo({
      url: '/screen/register/register',
    })
  },
  observe(packet) {
    try{
      var caller = 'observe';
      var major = packet.GetHeader().GetMajor()
      var minor = packet.GetHeader().GetMinor()

      Log.Debug({
        major: major,
        minor: minor,
        from: this.data.from,
        caller: caller,
        message: 'responded',
      })
      
      if(major == Major.SMS && minor == SMS.SendVerificationCodeRsp) {
        this.smsHandler(packet)
      } else if(major == Major.Account && minor == Account.LoginRsp) {
        this.loginHandler(packet)
      } else {
        Log.Debug({
          major: major,
          minor: minor,
          from: this.data.from,
          caller: caller,
          message: 'not matched',
        })
      }
    } catch(e) {
      Log.Debug({
        major: major,
        minor: minor,
        from: this.data.from,
        caller: caller,
        message: 'failure, err: ' + e,
      })
    } finally {
      return 
    }
  },
  loginHandler(packet) {
    var caller = 'loginHandler'
    var rsp = LoginRsp.FromJson(packet.GetBody())
    Log.Debug({
      major: packet.GetHeader().GetMajor(),
      minor: packet.GetHeader().GetMinor(),
      from: this.data.from,
      caller: caller,
      message: 'code: ' + rsp.GetCode(),
   })
   if (this.data.loginProgress != undefined) {
     this.data.loginProgress.Respond(rsp)
   }
  },
  smsHandler(packet) {
    var caller = 'smsHandler'
    var response = SendVerificationCodeRsp.FromJson(packet.GetBody())
    Log.Debug({
      major: packet.GetHeader().GetMajor(),
      minor: packet.GetHeader().GetMinor(),
      from: this.data.from,
      caller: caller,
      message: 'code: ' + response.GetCode(),
   })
    if ( response.GetCode() == Code.OK) {
      // success
    } else {
      this.setData({
        smsButtonLabel: Translator.Translate(TitleOfSendSMSButton),
        verificationCodeRequested: false,
        countdownNumber: 0,
      })
      if (response.GetCode() == Code.InvalidDataType ) {
        // phone number is invalid
        wx.showModal({
          title: Translator.Translate(TitleOfNotification),
          content: Translator.Translate(IllegalPhoneNumber),
          showCancel: false,
          success (res) {
            if (res.confirm) {
              console.log('press confirm')
            }
          }
        })
        return
      } else {
        // error code
      }
    }
  },
  request_to_login() {
    if (this.data.loginProgress == undefined) {
      var step = new LoginStep()
      step.SetCountryCode('86')
      step.SetPhoneNumber(this.data.phoneNumber)
      step.SetVerificationCode(this.data.verificationCode)
      this.setData({
        loginProgress: new LoginProgress({
          step: step,
          onSuccess: () => {
            this.data.loginProgress = undefined
            wx.switchTab({
              url: '/screen/home/home',
            })
          }, 
          onFailure: () => {
            this.data.loginProgress = undefined
            if (step.GetCode() == Code.InvalidData ) {
              // verification code is invalid
              wx.showModal({
                title: Translator.Translate(TitleOfNotification),
                content: Translator.Translate(IllegalVerificationCode),
                showCancel: false,
                success (res) {
                  if (res.confirm) {
                    console.log('press confirm')
                  }
                }
              })
              return
            } else if( step.GetCode() == Code.EntryNotFound ) {
              // user record not found
              wx.showModal({
                title: Translator.Translate(TitleOfNotification),
                content: Translator.Translate(phoneNumberNotRegisteredYet),
                showCancel: false,
                success (res) {
                  if (res.confirm) {
                    console.log('press confirm')
                  }
                }
              })
              return
            } else if( step.GetCode() == Code.InvalidDataType ) {
              // illegal phone number
              wx.showModal({
              title: Translator.Translate(TitleOfNotification),
              content: Translator.Translate(IllegalPhoneNumber),
              showCancel: false,
              success (res) {
                  if (res.confirm) {
                    console.log('press confirm')
                  }
                }
              })
              return
            } else  {
              // error code
            }
          },
        })
      })
      this.data.loginProgress.Show()
    }
  },
  on_phone_number_change(e) {
    this.setData({
      phoneNumber: e.detail.value
    })
    if(this.data.phoneNumber.length >= Config.LengthOfPhoneNumber && this.data.verificationCode.length >= Config.LengthOfVerificationCode) {
      this.setData({
        submitButtonDisabled: false,
      })
    } else {
      if (!this.data.submitButtonDisabled) {
        this.setData({
          submitButtonDisabled: true,
        })
      }
    }
  },
  on_verification_code_change(e) {
    this.setData({
      verificationCode: e.detail.value
    })
    if(this.data.phoneNumber.length >= Config.LengthOfPhoneNumber && this.data.verificationCode.length >= Config.LengthOfVerificationCode) {
      this.setData({
        submitButtonDisabled: false,
      })
    } else {
      if (!this.data.submitButtonDisabled) {
        this.setData({
          submitButtonDisabled: true,
        })
      }
    }
  },
  request_to_send_sms() {
    var caller = 'request_to_send_sms'
    if(this.data.verificationCodeRequested) {
      return
    }
    if(this.data.phoneNumber.length < Config.LengthOfPhoneNumber) {
      wx.showModal({
        title: Translator.Translate(TitleOfNotification),
        content: Translator.Translate(IllegalPhoneNumber),
        showCancel: false,
        success (res) {
          if (res.confirm) {
          }
        }
      })
      return
    }
    try {
      var caller = 'request_to_send_sms'
      var major = Major.SMS
      var minor = SMS.SendVerificationCodeReq
      
      Log.Debug({major:major, minor:minor, from:this.data.from, caller:caller, message:'test message'})

      SendVerificationCodeOfLogin({from:this.data.from, caller:caller, countryCode: '86' , phoneNumber:this.data.phoneNumber})

      var that = this
      this.setData({
        verificationCodeRequested: true,
        countdownNumber: 60,
      });
      var timer = setInterval(
        function() {
          var number = that.data.countdownNumber
          number = number - 1
          // console.log('number: ', number)
          if (number >= 0 ) {
            that.setData({
              smsButtonLabel: number,
              countdownNumber: number,
            });
          }
          if (number <= 0) {
            console.log('close timer')
            clearInterval(timer)
            that.setData({
              smsButtonLabel:Translator.Translate(TitleOfSendSMSButton),
              verificationCodeRequested: false,
            })
          }
        }, 1000,
      );
    } catch(e) {
      Log.Debug({major:major, minor:minor, from:this.data.from, caller:caller, message:'failure, err: ' + e})
    }
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    this.setData({
      smsButtonLabel: Translator.Translate(TitleOfSendSMSButton),
      lengthOfVerificationCode: Config.LengthOfVerificationCode,
      lengthOfPhoneNumber: Config.LengthOfPhoneNumber,
      title: Translator.Translate(TitleOfVerificationCodeLoginScreen),
      titleOfPhoneNumber: Translator.Translate(TitleOfPhoneNumber),
      titleOfVerificationCode:Translator.Translate(TitleOfVerificationCode) ,
      tipOfPlaceholderOfInputOfPhoneNumber: Translator.Translate(TipOfPlaceholderOfInputOfPhoneNumber),
      tipOfPlaceholderOfInputOfVerificationCode: Translator.Translate(TipOfPlaceholderOfInputOfVerificationCode),
      titleOfLoginButton: Translator.Translate(TitleOfLoginButton),
      titleOfRegisterButton: Translator.Translate(TitleOfRegisterButton),
      titleOfGuess: Translator.Translate(TitleOfGuess),
      titleOfPlease: Translator.Translate(TitleOfPlease),
      titleOfClick: Translator.Translate(TitleOfClick),
    })
    Runtime.SetObserve(this.observe)
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {
    Runtime.SetObserve(this.observe)
    this.setData({
      hide: false,
    })
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {
    this.setData({
      hide: true,
    })
  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  }
})