import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/navbar';
import * as serviceWorker from './serviceWorker';

// localStorage.setItem('ip', 'http://127.0.0.1:5000');
localStorage.setItem('ip', 'http://35.221.40.171:8080');

ReactDOM.render(
    <Navbar />,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
