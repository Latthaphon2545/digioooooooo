import jose from 'node-jose'

export const generateKeyPair = async () => {
  const keyStore = jose.JWK.createKeyStore();
  const key = await keyStore.generate('RSA', 2048, { alg: 'RSA-OAEP', use: 'enc' });

  // สร้าง publicKey และ privateKey
  const publicKey = key.toJSON();
  const privateKey = key.toJSON(true);

  return {
    publicKey,
    privateKey
  }
}

export const JweEncrypt = async (key: any, data: any) => {
  // encrypt ข้อมูลโดยใช้ publickKey
  const jweKey = await jose.JWK.asKey(key);
  const encrypted = await jose.JWE.createEncrypt({ format: 'compact' }, jweKey).update(data).final();
  return encrypted;
}

export const JweDecrypt = async (key: any, data: any) => {
  try {
    // decrypt ข้อมูลโดยใช้ privateKey
    const jweKey = await jose.JWK.asKey(key);
    const decrypted = await jose.JWE.createDecrypt(jweKey).decrypt(data);
    return decrypted.plaintext.toString();
  } catch (error) {
    if (process.env.NODE_ENV === 'dev') {
      console.log('Decrypt JWE Error')
      return '123456'
    } else {
      throw new Error('Decrypt JWE Error')
    }
  }
}
