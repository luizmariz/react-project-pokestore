import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ChooseStore from './pages/ChooseStore';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <ChooseStore />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
