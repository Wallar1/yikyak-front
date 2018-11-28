import React from 'react';
import ReactDOM from 'react-dom';
import Posts from './posts'
import * as serviceWorker from './serviceWorker';
import { ActionCableProvider } from 'react-actioncable-provider';
import { API_WS_ROOT } from './constants';


ReactDOM.render(
  <ActionCableProvider url={API_WS_ROOT}>
    <Posts />
  </ActionCableProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
