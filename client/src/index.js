import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faBriefcase, faSearch, faFolderPlus, faUserPlus, faSignInAlt, faMapMarker, faMobile, faLink, faHeartbeat } from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import jsonwebtoken from 'jsonwebtoken';
import setToken from '../src/utils/setToken';
import { SET_CURRENT_USER } from '../src/constants';
import reducer from '../src/reducers';


library.add(faHome, faBriefcase, faSearch, faFolderPlus, faUserPlus, faSignInAlt, faMapMarker, faMobile, faLink, faHeartbeat  )



const store = createStore(
    reducer,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension && process.env.NODE_ENV !== 'production'
        ? window.devToolsExtension() : f => f
    )
  );
  
  if (localStorage.token) {
    setToken(localStorage.token);
    store.dispatch({
      type: SET_CURRENT_USER,
      userData: jsonwebtoken.decode(localStorage.token)
    });
  }
ReactDOM.render(
<Provider store={store}>
<Router>
<App />
</Router>
</Provider>, document.getElementById('root'));
registerServiceWorker();
