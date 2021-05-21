import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ChooseStore from './pages/ChooseStore';
import GrassStore from './pages/GrassStore';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <ChooseStore />
        </Route>
        <Route exact path="/grass-store">
          <GrassStore />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
