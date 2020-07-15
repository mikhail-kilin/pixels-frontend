import api from 'services/api';

export default {
  urlRoot: '/cell',
  
  async color(cell) {
    return (
      await api.post(`${this.urlRoot}/put` , cell)
    ).data
  },
  async get_all() {
    return (
      await api.get(`${this.urlRoot}`)
    ).data
  },
};
