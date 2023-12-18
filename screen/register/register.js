const {TitleOfSendSMSButton, TitleOfRegisterButton,TitleOfLoginButton, TipOfPlaceholderOfInputOfVerificationCode,TipOfPlaceholderOfInputOfPhoneNumber, TitleOfVerificationCode, TitleOfPhoneNumber,TitleOfNotification,IllegalPhoneNumber, IllegalVerificationCode,PhoneNumberNotRegisteredYet,NotificationOfRegisterSuccessfully,TryLater,TitleOfPhoneNumberRegisterScreen,PhoneNumberAlreadyRegistered } = require("../../common/language/language")
const { Major } = require("../../common/route/major")
const { SMS } = require("../../common/route/sms")
const { Translator } = require("../../common/translator/translator")
const { Config } = require("../../config/config")
const { Log } = require("../../utils/log")
const {SendVerificationCodeRsp} = require('../../common/protocol/sms/send_verification_code')
const { SendVerificationCodeOfRegister } = require("../../common/business/sms/send_verification_code")
const { Runtime } = require("../../runtime/runtime")
const { Account } = require("../../common/route/account")
const { Code } = require("../../common/code/code")
const { RegisterRsp } = require("../../common/protocol/account/register")
const { Register } = require("../../common/business/account/register")
const language = require("../../common/language/language")

Page({
  data: {
    from: 'register',
    phoneNumber: '',
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
    lengthOfVerificationCode: 0,
    lengthOfPhoneNumber: 0,
    smsButtonLabel:'',
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
      } else if(major == Major.Account && minor == Account.RegisterRsp) {
        this.registerHandler(packet)
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
  registerHandler(packet) {
    var caller = 'registerHandler'
    var response = (new RegisterRsp()).FromJson(packet.GetBody())
    Log.Debug({
      major: packet.GetHeader().GetMajor(),
      minor: packet.GetHeader().GetMinor(),
      from: this.data.from,
      caller: caller,
      message: 'code: ' + response.GetCode(),
   })
   if (response.GetCode() == Code.OK) {
    // success
    wx.showModal({
      title: Translator.Translate(language.TitleOfNotification),
      content: Translator.Translate(language.NotificationOfRegisterSuccessfully),
      showCancel: false,
      success (res) {
        if (res.confirm) {
          console.log('press confirm')
          wx.navigateBack()
        }
      }
    })
   } else if (response.GetCode() ==  Code.AppDataExpired) {
    wx.showModal({
      title: Translator.Translate(language.TitleOfNotification),
      content: Translator.Translate(language.IllegalVerificationCode),
      showCancel: false,
      success (res) {
        if (res.confirm) {
          // do nothing
        }
      }
    })
   } else if (response.GetCode() == Code.EntryAlreadyExists) {
    wx.showModal({
      title: Translator.Translate(language.TitleOfNotification),
      content: Translator.Translate(language.PhoneNumberAlreadyRegistered),
      showCancel: false,
      success (res) {
        if (res.confirm) {
          // do nothing
        }
      }
    })
   } else if (response.GetCode() == Code.DatabaseFailure) {
    wx.showModal({
      title: Translator.Translate(language.TitleOfNotification),
      content: Translator.Translate(language.TryLater),
      showCancel: false,
      success (res) {
        if (res.confirm) {
          // do nothing
        }
      }
    })
   } else {
    wx.showModal({
      title: Translator.Translate(language.TitleOfNotification),
      content: Translator.Translate(language.TryLater),
      showCancel: false,
      success (res) {
        if (res.confirm) {
          // do nothing
        }
      }
    })
   }
  },
  smsHandler(packet) {
    var caller = 'smsHandler'
    var response = (new SendVerificationCodeRsp()).FromJson(packet.GetBody())
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
  request_to_register() {
    try{
      var caller = 'request_to_register'
      var major = Major.Account
      var minor = Account.RegisterReq
      Register({from:this.data.from, caller:caller, countryCode:'86', phoneNumber:this.data.phoneNumber, verificationCode:this.data.verificationCode})
    } catch(e) {
     Log.Debug({major:major, minor:minor, from:this.data.from, caller:caller, message:'failure, err: ' + e})
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

      SendVerificationCodeOfRegister({from:this.data.from, caller:caller, countryCode: '86' , phoneNumber:this.data.phoneNumber})

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
      title: Translator.Translate(TitleOfPhoneNumberRegisterScreen),
      titleOfPhoneNumber: Translator.Translate(TitleOfPhoneNumber),
      titleOfVerificationCode:Translator.Translate(TitleOfVerificationCode) ,
      tipOfPlaceholderOfInputOfPhoneNumber: Translator.Translate(TipOfPlaceholderOfInputOfPhoneNumber),
      tipOfPlaceholderOfInputOfVerificationCode: Translator.Translate(TipOfPlaceholderOfInputOfVerificationCode),
      titleOfLoginButton: Translator.Translate(TitleOfLoginButton),
      titleOfRegisterButton: Translator.Translate(TitleOfRegisterButton),
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

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

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