const integrationConfig = {
  alipayPlus: {
    host: process.env.ALIPAYPLUST_HOST!,
    userInitiatedPay: process.env.ALIPAYPLUST_USER_INITIATED_PAY!,
    notifyPayment: process.env.ALIPAYPLUST_NOTIFY_PAYMENT!,
    clientId: process.env.ALIPAYPLUST_CLIENT_ID!,
    publickKey: process.env.ALIPAYPLUST_PUBLIC_KEY!,
  },
  alipaySDKServer: {
    host: process.env.ALIPAYSDKSERVER_HOST!,
    identifyCode: process.env.ALIPAYSDKSERVER_IDENTIFY_CODE!,
  }
}

export default integrationConfig
