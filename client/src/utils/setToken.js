import axios from 'axios';


export default function setToken(token) {
  if (token) {
    axios.defaults.headers.common['authorization'] = token;
    console.log(token)
  } else {
    delete axios.defaults.headers.common['authorization'];
  }
}
