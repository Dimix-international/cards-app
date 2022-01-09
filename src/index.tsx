import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {App} from './n1-main/m1-ui/App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./n1-main/m2-bll/state";
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter basename={'/cards-app'}>
        <Provider store={store}><App /></Provider>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. LearnPack more: https://bit.ly/CRA-vitals
reportWebVitals();