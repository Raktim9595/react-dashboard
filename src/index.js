import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./assets/css/grid.css";
import "./assets/css/theme.css";
import { Provider } from "react-redux";
import { createStore, compose } from 'redux';
import rootReducer from "./redux/reducers/index";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore( rootReducer, composeEnhancers() );

ReactDOM.render(
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  ,
  document.getElementById('root')
);
