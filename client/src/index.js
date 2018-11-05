import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faBriefcase, faSearch, faFolderPlus, faUserPlus, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

library.add(faHome, faBriefcase, faSearch, faFolderPlus, faUserPlus, faSignInAlt  )
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
