import api from 'services/api';

export default {
  urlRoot: '/rollback',
  
  async set(cell) {
    return (
      await api.post(`${this.urlRoot}`, cell)
    ).data
  },
  async get() {
    return (
      await api.get(`${this.urlRoot}`)
    ).data
  },
};
