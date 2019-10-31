import {
  get as rawGet,
  post as rawPost,
  patch as rawPatch,
  del as rawDelete,
} from 'axios';
import { merge } from 'lodash/fp';

const createHeaderWithBearerToken = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export const sendWithUserAuthToken = (httpMethod) => (url, config = {}, token = '') => {
  const authHeader = createHeaderWithBearerToken(token);
  return httpMethod(url, merge(config, authHeader)).then((res) => res.data);
};

export const get = sendWithUserAuthToken(rawGet);
export const post = sendWithUserAuthToken(rawPost);
export const patch = sendWithUserAuthToken(rawPatch);
export const del = sendWithUserAuthToken(rawDelete);
