const tokenConfig = {
  accessToken: {
    secret: process.env.TOKEN_ACCESS_TOKEN_SECRET,
    path: '/',
    expired: Number(process.env.TOKEN_ACCESS_TOKEN_EXPIRED)
  }
}

export default tokenConfig
