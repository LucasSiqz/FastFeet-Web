import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Orders from '../pages/Orders';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/orders" component={Orders} isPrivate />
      <Route path="/deliverymen" component={Orders} isPrivate />
      <Route path="/recipients" component={Orders} isPrivate />
      <Route path="/problems" component={Orders} isPrivate />
    </Switch>
  );
}
