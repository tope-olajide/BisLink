import React from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {
    BrowserRouter
} from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import thunk from 'redux-thunk';
import {
    Provider
} from 'react-redux';
import reducer from './reducer'


import './styles/toastr.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension && process.env.NODE_ENV !== 'production' ?
        window.devToolsExtension() : f => f
    )
);
ReactDOM.render( <Provider store = {store} >
        <BrowserRouter>
        <App />
        </BrowserRouter> 
        </Provider>,
        document.getElementById('root'));

        registerServiceWorker();