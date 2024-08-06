import crypto from 'crypto'

export const encryptPublic = (toEncrypt: any, publicKey: string) => {
  const keyData = '-----BEGIN PUBLIC KEY-----\n' + publicKey + '\n-----END PUBLIC KEY-----'
  const buffer = Buffer.from(JSON.stringify(toEncrypt), 'utf8')
  const encrypted = crypto.publicEncrypt({
    key: keyData.toString(),
    padding: crypto.constants.RSA_PKCS1_PADDING
  }, buffer)

  return encrypted.toString('base64')
}
