import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import {store} from './redux/store/store'
import {BrowserRouter,} from 'react-router-dom'

ReactDOM.render(

    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>

  ,
  document.getElementById('root')
);

if('serviceWorker' in navigator && process.env.NODE_ENV !== "development") {
  //navigator.serviceWorker.register(`/service-worker.js`) 
};

