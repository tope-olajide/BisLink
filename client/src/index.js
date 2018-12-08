import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {
    BrowserRouter
} from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
    library
} from '@fortawesome/fontawesome-svg-core'
import {
    faHome,
    faBriefcase,
    faSearch,
    faFolderPlus,
    faUserPlus,
    faSignInAlt,
    faMapMarker,
    faMobile,
    faLink,
    faHeartbeat
} from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

library.add(faHome, faBriefcase, faSearch, faFolderPlus, faUserPlus, faSignInAlt, faMapMarker, faMobile, faLink, faHeartbeat)
ReactDOM.render( <BrowserRouter>
        <App/>
        </BrowserRouter>, document.getElementById('root'));
        registerServiceWorker();