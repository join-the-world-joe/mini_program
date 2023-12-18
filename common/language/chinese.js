const {TryLater, TitleOfNotification, TitleOfSendSMSButton, TitleOfRegisterButton,TipOfPlaceholderOfInputOfVerificationCode, TipOfPlaceholderOfInputOfPhoneNumber, TitleOfVerificationCode, TitleOfLoginButton, TitleOfPhoneNumber, TitleOfVerificationCodeLoginScreen, TitleOfGuess, TitleOfPlease, TitleOfClick,IllegalPhoneNumber,IllegalVerificationCode,PhoneNumberNotRegisteredYet,TitleOfPhoneNumberRegisterScreen,NotificationOfRegisterSuccessfully, PhoneNumberAlreadyRegistered } = require("./language")

class Chinese {
  static Name = 'Chinese'
  static Language = {}

  static Load() {
    // console.log('Chinese.Init')
    this.Language[TryLater] = '稍后重试'
    this.Language[TitleOfVerificationCodeLoginScreen] = '会员登录'
    this.Language[TitleOfPhoneNumber] = '手机号'
    this.Language[TitleOfVerificationCode] = '验证码'
    this.Language[TipOfPlaceholderOfInputOfPhoneNumber] = '请输入手机号码'
    this.Language[TipOfPlaceholderOfInputOfVerificationCode] = '请输入短信验证码'
    this.Language[TitleOfLoginButton] = '登录'
    this.Language[TitleOfRegisterButton] = '注册'
    this.Language[TitleOfGuess] = '访客'
    this.Language[TitleOfPlease] = '请'
    this.Language[TitleOfClick] = '点击'
    this.Language[TitleOfSendSMSButton] = '获取'
    this.Language[TitleOfNotification] = "温馨提示："
    this.Language[IllegalPhoneNumber] = '非法的手机号'
    this.Language[IllegalVerificationCode] = '非法的验证码'
    this.Language[PhoneNumberNotRegisteredYet] = '手机号未注册'
    this.Language[TitleOfPhoneNumberRegisterScreen] = '会员注册'
    this.Language[NotificationOfRegisterSuccessfully] = '注册成功'
    this.Language[PhoneNumberAlreadyRegistered] = '手机号已注册'
  }

  static Translate(input) {
    // console.log('input: ', input)
    // console.log('s: ', this.Language[input])
    if (this.Language[input] != null) {
      return this.Language[input]
    }
    return '未作中文翻译'
  }
}

module.exports = {
  Chinese
}