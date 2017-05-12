module.exports = {
  server: {},
  host: {
    port: 8000,
  },
  logs: {
    reporters: {
      consoleReporter: [{
        module: 'good-console',
        args: [{ log: '*', response: '*', worker: '*' }],
      }, 'stdout'],
    },
  },
  oauth: {
    accessTokenTTL: 'P2D',
    refreshTokenTTL: 'P2W',
    authorizationCodeTTL: 'PT10M',
  },
  csrf: {
    skip: req => !/(\/oauth\/authorize|\/dashboard|\/login)/.test(req.path),
    cookieOptions: {
      isSecure: false,
    },
  },
  login: {
    cache: {
      ttl: 3 * 24 * 60 * 60 * 1000,
    },
    cookie: {
      secret: '12345678901234567890123456789012',
      name: 'lvconnect',
      redirect: '/login',
      isSecure: false,
    },
  },
  trello: {},
  github: {},
  slack: {},
};
