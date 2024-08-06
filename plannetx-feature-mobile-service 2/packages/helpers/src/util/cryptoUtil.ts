import { createCipheriv, createDecipheriv, publicEncrypt, publicDecrypt, constants } from 'crypto';

const algorithm = 'aes-256-cbc';
const key = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
const iv = '1234567890abcdef1234567890abcdef'

export const cryptoEncrypt = (text: string): string => {
  if (!text) return ''
  const cipher = createCipheriv(algorithm, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

export const cryptoDecrypt = (encrypted: string): string =>{
  if (!encrypted) return ''
  const decipher = createDecipheriv(algorithm, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

export const scbEncryptData = (toEncrypt: any, publicKey: string) => {
  const keyData = '-----BEGIN PUBLIC KEY-----\n' + publicKey + '\n-----END PUBLIC KEY-----'
  const buffer = Buffer.from(JSON.stringify(toEncrypt), 'utf8')
  const encrypted = publicEncrypt({
    key: keyData.toString(),
    padding: constants.RSA_PKCS1_PADDING
  }, buffer)

  return encrypted.toString('base64')
}

export const scbDecryptData = (encryptData: string, publicKey: string) => {
  const keyData = "-----BEGIN PUBLIC KEY-----\n" + publicKey +  "\n-----END PUBLIC KEY-----";
  const buffer = Buffer.from(encryptData, 'base64')
  const decrypted = publicDecrypt({
    key: keyData.toString(),
    padding: constants.RSA_PKCS1_PADDING
  },buffer,
  )
  return decrypted.toString('utf8')
}                   
