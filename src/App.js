import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PokeStoreHome from './pages/PokeStoreHome';
import GrassStore from './pages/GrassStore';
import FireStore from './pages/FireStore';
import WaterStore from './pages/WaterStore';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/">
          <PokeStoreHome />
        </Route>
        <Route path="/grass-store">
          <GrassStore />
        </Route>
        <Route path="/fire-store">
          <FireStore />
        </Route>
        <Route path="/water-store">
          <WaterStore />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
