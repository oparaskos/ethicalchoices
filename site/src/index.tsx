import './index.css';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import App from './components/app/App';
import { Footer } from '@tryflux/pixels-web-components';
import Product from './components/product/Product';
import React from 'react';
import ReactDOM from 'react-dom';
import Search from './components/search/Search';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/products" component={Search} />
        <Route path="/product/:productId" component={Product} />
        <Route path="/" component={App} />
      </Switch>
      <Footer />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
