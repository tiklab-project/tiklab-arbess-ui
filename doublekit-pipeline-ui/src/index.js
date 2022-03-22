import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss'
import './assets/font_icon/iconfont'
import { Provider } from 'mobx-react';
import store from "./store";
import App from './App';

ReactDOM.render(
  <Provider {...store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept()
}

