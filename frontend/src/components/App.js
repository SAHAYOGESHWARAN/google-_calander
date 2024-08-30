import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Calendar from './Calendar';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/calendar" component={Calendar} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
