const tokenConfig = {
  accessToken: {
    secret: process.env.TOKEN_ACCESS_TOKEN_SECRET,
    path: '/',
    expired: Number(process.env.TOKEN_ACCESS_TOKEN_EXPIRED)
  },
  refreshToken: {
    secret: process.env.TOKEN_REFRESH_TOKEN_SECRET,
    path: '/',
    expired: Number(process.env.TOKEN_REFRESH_TOKEN_EXPIRED)
  }
}

export default tokenConfig
