const LengthOfVerificationCode = 4
const LengthOfPhoneNumber = 11
const key = '3dd19414e91ac01b'
const iv = '2624b9a9c447e587'
const publicKey = `
-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgFnWSUwsmGawhMJ30z6y5li2jcf1
m7rPMZcwZOS3To8bk3OBaMGhVEc1F8GtJBbc1rn/HCLNL9zrCy21EefJON8tRFcY
HnpseZSzh+349lIhS+MFw9x4JUddwSPDyxwha929cKzMuVoftu3CJ+kqDBVvxLk7
iDBzUMqW3Kgehk2TAgMBAAE=
-----END PUBLIC KEY-----
`
const privateKey = `
-----BEGIN RSA PRIVATE KEY-----
MIICWgIBAAKBgFnWSUwsmGawhMJ30z6y5li2jcf1m7rPMZcwZOS3To8bk3OBaMGh
VEc1F8GtJBbc1rn/HCLNL9zrCy21EefJON8tRFcYHnpseZSzh+349lIhS+MFw9x4
JUddwSPDyxwha929cKzMuVoftu3CJ+kqDBVvxLk7iDBzUMqW3Kgehk2TAgMBAAEC
gYBRChPeyk/EOrHX912xLpLKLguh+LY9g1B50ScChzUvtTGDPZaxLQYoogVHKhfn
I9nzuOS5pBzsDX9tAO0hCQzqfHgqRjn+vEgm1Ui+f0E3BVRnhobcJKZpZqlvCBR5
Gu2+zlrY4SeGq3AuQSr/A5FiB5k0RgsvNycDTjqyg7TXGQJBAJoZ8Yr0zakxT1I8
lVqsFbeNPtt8FNG2UgIlIs9RL7aXhw+Y3sWtk/kbaOXafSofu0NcQYx4Km3M3kiP
lcNfTJ8CQQCVPcaRpu+mprRgHS6s76Z668NaFsjX04CUUa0kCrey+Nf/SJJ3BkRH
M7GllZWuI/RSXs/F5N38p5bfkn7QZqaNAkBy3dHJZW8DpgjdYOFnhAxwFK39BwGx
zHhWtv26kWbCcTKwsp+jtB4vunm3k+RmiN6aeGM35L6jt+kdJ0JYLmo7AkBJpRZb
wZj5D8Jqu3vQ8uGgPr9DsYKinkgQ6M0bv/4uXwWXf+Rmv7zpteSv5UTbjfp+uzKk
YO/6QWj+InhZto3xAkAOA0i702dLHm5elLWvht7UEYIDEW1+rYGdbthmJBvT9sZh
VKL954Y9hDzBWepjYsBiJnmIkgeladPnU5025/G/
-----END RSA PRIVATE KEY-----
`

module.exports = {
  iv,
  key,
  publicKey,
  privateKey,
  LengthOfPhoneNumber,
  LengthOfVerificationCode,
}