import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PokeStoreHome from './pages/PokeStoreHome';
import GrassStore from './pages/GrassStore';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <PokeStoreHome />
        </Route>
        <Route path="/grass-store">
          <GrassStore />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
