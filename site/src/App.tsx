import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SearchResultsPage } from './routes/products/product_search';
import { ResultPage } from './routes/products/product';
import { HomePage } from './routes/home/home';
import { ROUTE_HOME, ROUTE_PRODUCT, ROUTE_PRODUCTS, EMAIL_SUPPORT, LINK_GITHUB } from './routes';
import './App.scss';

function App() {
  return (
    <Router>
      <div className="page">
        <header>
          <nav></nav>
        </header>
        <main>
          <Switch>
            <Route path={ROUTE_HOME} exact component={HomePage} />
            <Route path={ROUTE_PRODUCT} component={ResultPage} />
            <Route path={ROUTE_PRODUCTS} component={SearchResultsPage} />
            <Route render={() => <h1>404: page not found</h1>} />
          </Switch>
        </main>
        <footer>
          <p>Get in touch <a href={`mailto:${EMAIL_SUPPORT}`}>{EMAIL_SUPPORT}</a></p>
          <p>Ethical Choices is an open-source project. under the <a href="https://www.apache.org/licenses/LICENSE-2.0.html">Apache 2.0 License</a>. <a href={LINK_GITHUB}>Fork us on GitHub</a></p>
        </footer>
      </div>
    </Router>
  );
}

export default App;