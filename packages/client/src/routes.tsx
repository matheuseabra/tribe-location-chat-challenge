import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ChatMap from './pages/ChatMap';
import Register from './pages/Register';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Register} />
      <Route exact path="/chat" component={ChatMap} />
    </Switch>
  );
};

export default Routes;
