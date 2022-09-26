import axios from 'axios';
import commonStore from './commonStore';

const httpRequest = axios.create({
  baseURL: 'http://localhost:9000/api/v1/',
});

const get = async (path: string, options = {}) => {
  const response = await httpRequest.get(path, options);
  return response.data;
};
const post = async (path: string, options = {}) => {
  const response = await httpRequest.post(path, options);
  return response.data;
};

const remove = async (path: string, options = {}) => {
  const response = await httpRequest.delete(path, options);
  return response.data;
};

httpRequest.interceptors.request.use((config) => {
  const store = commonStore('store');
  const accessToken = store.get('accessToken');
  console.log('accessToken', accessToken);
  if (accessToken) {
    config.headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  }
  return config;
});

export { get, post, remove };
