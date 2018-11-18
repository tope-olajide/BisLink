import axios from 'axios';

/**
 * @description - Sets token for subsequent axios calls
 *
 * @export
 *
 * @param {string} token - Token
 *
 * @returns {void} Nothing
 */
export default function setToken(token) {
  if (token) {
    axios.defaults.headers.common['x-access-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-access-token'];
  }
}
