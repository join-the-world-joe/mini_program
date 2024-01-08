const {TitleOfDeals,TryLater, TitleOfNotification, TitleOfSendSMSButton, TitleOfRegisterButton,TipOfPlaceholderOfInputOfVerificationCode, TipOfPlaceholderOfInputOfPhoneNumber, TitleOfVerificationCode, TitleOfLoginButton, TitleOfPhoneNumber, TitleOfVerificationCodeLoginScreen, TitleOfGuess, TitleOfPlease, TitleOfClick,IllegalPhoneNumber,IllegalVerificationCode,PhoneNumberNotRegisteredYet,TitleOfPhoneNumberRegisterScreen,NotificationOfRegisterSuccessfully, PhoneNumberAlreadyRegistered,TitleOfLoading,TitleOfBarbecue,TitleOfSnacks,TitleOfCamping, AttempToLogin } = require("./language")

class Chinese {
  static Name = 'Chinese'
  static Language = {}

  static Load() {
    // console.log('Chinese.Init')
    Chinese.Language[TryLater] = '稍后重试'
    Chinese.Language[TitleOfVerificationCodeLoginScreen] = '会员登录'
    Chinese.Language[TitleOfPhoneNumber] = '手机号'
    Chinese.Language[TitleOfVerificationCode] = '验证码'
    Chinese.Language[TipOfPlaceholderOfInputOfPhoneNumber] = '请输入手机号码'
    Chinese.Language[TipOfPlaceholderOfInputOfVerificationCode] = '请输入短信验证码'
    Chinese.Language[TitleOfLoginButton] = '登录'
    Chinese.Language[TitleOfRegisterButton] = '注册'
    Chinese.Language[TitleOfGuess] = '访客'
    Chinese.Language[TitleOfPlease] = '请'
    Chinese.Language[TitleOfClick] = '点击'
    Chinese.Language[TitleOfSendSMSButton] = '获取'
    Chinese.Language[TitleOfNotification] = "温馨提示："
    Chinese.Language[IllegalPhoneNumber] = '非法的手机号'
    Chinese.Language[IllegalVerificationCode] = '非法的验证码'
    Chinese.Language[PhoneNumberNotRegisteredYet] = '手机号未注册'
    Chinese.Language[TitleOfPhoneNumberRegisterScreen] = '会员注册'
    Chinese.Language[NotificationOfRegisterSuccessfully] = '注册成功'
    Chinese.Language[PhoneNumberAlreadyRegistered] = '手机号已注册'
    Chinese.Language[TitleOfLoading] = '加载中'
    Chinese.Language[TitleOfDeals] = '今日特价'
    Chinese.Language[TitleOfBarbecue] = '烧烤必备'
    Chinese.Language[TitleOfSnacks] = '畅销零食'
    Chinese.Language[TitleOfCamping] = '露营专享'

    Chinese.Language[AttempToLogin] = '正在登入系统'
  }

  static Translate(input) {
    // console.log('input: ', input)
    // console.log('s: ', Chinese.Language[input])
    if (Chinese.Language[input] != null) {
      return Chinese.Language[input]
    }
    return '未作中文翻译'
  }
}

module.exports = {
  Chinese
}