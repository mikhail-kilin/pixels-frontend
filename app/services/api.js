import axios from 'axios';
import Alert from 'react-s-alert';
import currentUser from 'services/currentUser';
import sessionStorage from 'services/sessionStorage';
import i18n from 'services/i18n';
import config from 'config';

const api = axios.create({ baseURL: config.apiTarget });

api.interceptors.request.use(
  (axiosConfig) => {
    if (axiosConfig.withoutAuth) return axiosConfig;

    return {
      ...axiosConfig,
      headers: {
        ...axiosConfig.headers,
        'X-User-Email': currentUser.email,
        'Authentication_token': currentUser.token,
      },
    };
  },
  error => Promise.reject(error),
);


api.interceptors.response.use(
  response => response,
  (error) => {
    const {
      message,
      response: errorResponse,
    } = error;

    if (errorResponse) {
      if (errorResponse.status === 401) {
        sessionStorage.remove();
      } else if (errorResponse.status !== 403 && errorResponse.status !== 500){
        Alert.error(errorResponse.data.error);
      }
    } else if (message === 'Network Error') {
      Alert.error(i18n.t('common:errorNetwork'));
    }

    return Promise.reject(error);
  },
);

export default api;
