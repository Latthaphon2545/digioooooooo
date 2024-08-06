const serverRuntimeConfig = {
  SERVICE: process.env.SERVER_SERVICE
}

const publicRuntimeConfig = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET
}

module.exports = {
  serverRuntimeConfig,
  publicRuntimeConfig,
  poweredByHeader: false,
  webpack: (config, { dev }) => {
    config.resolve.fallback = { fs: false }
    return config
  },
  async rewrites () {
    return [
      {
        source: '/api/:slug*',
        destination: 'http://127.0.0.1:9300/:slug*'
      }
    ]
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  }
}
