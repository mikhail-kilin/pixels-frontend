import storage from 'lib/storage';
import config from 'config';

export default class SessionStorage {
  static currentUser() {
    return storage.get(config.storage.sessionKey) || {};
  }

  static loggedIn() {
    return this.currentUser() != null && this.currentUser().hasOwnProperty("authentication_token");
  }

  static set(user) {
    storage.set(config.storage.sessionKey, user);
  }

  static remove() {
    storage.remove(config.storage.sessionKey);
  }
}
