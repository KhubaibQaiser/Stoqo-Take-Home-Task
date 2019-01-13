import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './_store';
import "./_assets/css/bootstrap.min.css";
import "./_assets/css/fonts.css";
import "./_assets/css/font-style.css";
import './_assets/css/style.css';
import App from './App';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

