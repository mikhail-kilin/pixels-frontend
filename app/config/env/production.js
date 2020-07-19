module.exports = {
  env: process.env.NODE_ENV,
  target: 'http://164.90.218.141',
  apiTarget: 'http://164.90.218.141/api/v1',
  storage: {
    sessionKey: 'user_session',
    localizationKey: 'i18nextLng',
  },
  session: {
    tokenKey: 'authentication_token',
    emailKey: 'email',
  },
};
