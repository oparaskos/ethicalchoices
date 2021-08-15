import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SearchResults from './routes/SearchResults';
import Search from './routes/Search';

function App() {
    return (
        <Router>
            <main>
                <Switch>
                    <Route path="/" exact component={Search} />
                    <Route path="/search"  component={SearchResults} />
                    <Route render={() => <h1>404: page not found</h1>} />
                </Switch>
            </main>
        </Router>
    );
}

export default App;