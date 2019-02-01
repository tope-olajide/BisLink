import axios from 'axios';

export default setToken=(token) => {
  if (token) {
    axios.defaults.headers.common['authorization'] = token;
  } else {
    delete axios.defaults.headers.common['authorization'];
  }
}
