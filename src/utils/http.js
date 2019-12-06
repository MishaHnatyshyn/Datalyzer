import {
  get as rawGet,
  post as rawPost,
  patch as rawPatch,
  del as rawDelete, default as axios,
} from 'axios';
import { merge } from 'lodash/fp';
import { LOGIN_URL } from '../config/routing';
import { LOGIN_ENDPOINT, API_URL } from '../config/endpoints';
import store, { history } from '../store';
import { getToken } from '../store/login/selectors';


const handleUnAuthorizedError = (error) => {
  const { response: { status, config: { url } } } = error;
  if (status === 401 && url !== LOGIN_ENDPOINT) return history.push(LOGIN_URL);
  throw error;
};

const createHeaderWithBearerToken = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
});

// export const sendWithUserAuthToken = (httpMethod) => (url, config = {}) => {
//   const token = getToken(store.getState());
//   const authHeader = token ? createHeaderWithBearerToken(token) : {};
//   return httpMethod(`${API_URL}${url}`, merge(config, authHeader))
//     .then((res) => res.data)
//     .catch(handleUnAuthorizedError);
// };

export const sendWithUserAuthToken = (httpMethod) => (url, config = {}) => {
  const token = getToken(store.getState());
  const authHeader = createHeaderWithBearerToken(token);
  const options = {
    url: `${API_URL}${url}`,
    method: httpMethod,
    ...config,
    ...authHeader
  };
  return axios(options)
    .then((res) => res.data)
    .catch(handleUnAuthorizedError);
};

export const get = sendWithUserAuthToken('get');
export const post = sendWithUserAuthToken('post');
export const patch = sendWithUserAuthToken('patch');
export const del = sendWithUserAuthToken('delete');
