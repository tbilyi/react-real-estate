import React, { Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './containers/Home/Home';
import Navigation from './components/Navigation/Navigation';
import MyFlats from './containers/Property/TraderPropertyList/TraderPropertyList';
import MarketFlatDetails from './containers/Market/MarketFlatDetails/MarketFlatDetails';
import TraderPropertyDetails from './containers/Property/TraderPropertyDetails/TraderPropertyDetails';
import Account from "./containers/Account/Account";

const MarketFlats = lazy(() => import('./containers/Market/MarketFlatsList/MarketFlatsList'));

function App() {
  return (
    <div className="App">
      <Navigation />
      <div className="container-fluid">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/my-flats" exact component={MyFlats} />
          <Route path="/market/flat/:id" component={MarketFlatDetails} />
          <Route path="/my-flats/flat/:id" component={TraderPropertyDetails} />
          <Route path="/account" component={Account} />
          <Suspense fallback={<p>Loading...</p>}>
            <Route path="/market" component={MarketFlats} />
          </Suspense>
          <Redirect to="/my-flats" />
        </Switch>
      </div>
    </div>
  );
}
export default App
