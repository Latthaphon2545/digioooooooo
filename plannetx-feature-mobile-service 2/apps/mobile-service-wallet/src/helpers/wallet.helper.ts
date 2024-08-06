const addSum = (text: string) => {
  let i
  const Luhn = text
  let sum = 0
  for (i = 0; i < Luhn.length; i++) {
    sum += parseInt(Luhn.substring(i, i + 1))
  }
  const delta = [0, 1, 2, 3, 4, -4, -3, -2, -1, 0]
  for (i = Luhn.length - 1; i >= 0; i -= 2) {
    const deltaIndex = parseInt(Luhn.substring(i, i + 1))
    const deltaValue = delta[deltaIndex]
    sum += deltaValue
  }
  let mod10 = sum % 10
  mod10 = 10 - mod10
  if (mod10 === 10) {
    mod10 = 0
  }
  return text + mod10
}

export const createWalletId = (runningCode: string) => {
  const scbCode = '014'
  const projectCode = '101'
  const walletType = {
    consumer: '1',
    merchant: '2'
  }
  const walletId = addSum(scbCode + projectCode + walletType.consumer + runningCode)

  return walletId
}

export const maskingAccountNumber = (accountNumber: string) => {
  return '****' + accountNumber.slice(-4)
}