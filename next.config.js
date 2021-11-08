module.exports = {
  publicRuntimeConfig: {
    embeddedApiKey: 'apiKey',
    embeddedRedirectUrl: 'http://localhost:3001/install',
    embeddedScopes: ['read_products', 'write_products'],
  },
  serverRuntimeConfig: {
    embeddedApiSecret: 'apiSecret',
  },
};
