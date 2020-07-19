module.exports = {
  env: process.env.NODE_ENV,
  target: 'http://localhost:8080',
  apiTarget: 'http://localhost:8080/v1',
  apiPath: '/v1',
  storage: {
    sessionKey: 'user_session',
    localizationKey: 'i18nextLng',
  },
  session: {
    tokenKey: 'authentication_token',
    emailKey: 'email',
  },
};
