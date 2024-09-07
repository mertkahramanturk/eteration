import api from './axios';

const get = async (url, params) => {
  try {
    return await api.get(url);
  } catch (e) {
    if (!e || !e.response || e.response.status !== 401) throw e;
    sessionStorage.setItem('url', `${window.location.pathname}${window.location.search}`);
    try {
      return api.get(url);
    } catch (err) {
      return null;
    }
  }
};

export default get