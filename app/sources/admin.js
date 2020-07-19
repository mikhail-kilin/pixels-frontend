import api from 'services/api';

export default {
  urlRoot: '/admin/statistic',

  async country(name) {
    return (
      await api.get(`${this.urlRoot}/country/${name}`)
    ).data
  },
  async city(name) {
    return (
      await api.get(`${this.urlRoot}/city/${name}`)
    ).data
  },
  async user(email) {
    return (
      await api.get(`${this.urlRoot}/user?email=${email}`)
    ).data
  },
};
