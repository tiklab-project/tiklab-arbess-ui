import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.scss'
import { Provider } from 'mobx-react';
import store from "./store";
import App from './App';

ReactDOM.render(
        <Provider {...store}>
            <App/>
        </Provider>,
  document.getElementById('root')
);

