import {
  get as rawGet,
  post as rawPost,
  patch as rawPatch,
  del as rawDelete,
} from 'axios';
import { merge } from 'lodash/fp';
import { LOGIN_URL } from '../config/routing';
import { LOGIN_ENDPOINT, API_URL } from '../config/endpoints';
import { history } from '../store';


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

export const sendWithUserAuthToken = (httpMethod) => (url, config = {}, token) => {
  const authHeader = token ? createHeaderWithBearerToken(token) : {};
  return httpMethod(`${API_URL}${url}`, merge(config, authHeader))
    .then((res) => res.data)
    .catch(handleUnAuthorizedError);
};

export const get = sendWithUserAuthToken(rawGet);
export const post = sendWithUserAuthToken(rawPost);
export const patch = sendWithUserAuthToken(rawPatch);
export const del = sendWithUserAuthToken(rawDelete);
