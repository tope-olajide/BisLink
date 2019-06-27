import React from "react";
import ReactDOM from "react-dom";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap-css-only/css/bootstrap.css";
import "mdbreact/dist/css/mdb.css";
import { BrowserRouter as Router } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducer from "./reducer";

import "./styles/toastr.css";
import "./styles/index.scss";

import App from "./App.jsx";
import * as serviceWorker from "./serviceWorker";
const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension && process.env.NODE_ENV !== "production"
      ? window.devToolsExtension()
      : f => f
  )
);
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
