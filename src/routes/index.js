import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import Orders from '~/pages/Orders';
import Recipients from '~/pages/Recipients';
import RecipientForm from '~/pages/Recipients/RecipientForm';
import Deliverymen from '~/pages/Deliverymen';
import DeliverymenForm from '~/pages/Deliverymen/DeliverymenForm';
import OrderForm from '~/pages/Orders/OrderForm';
import Problems from '~/pages/Problems';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/orders/edit/:id" component={OrderForm} isPrivate />
      <Route path="/orders/new" component={OrderForm} isPrivate />
      <Route path="/orders" component={Orders} isPrivate />

      <Route
        path="/deliverymen/edit/:id"
        component={DeliverymenForm}
        isPrivate
      />
      <Route path="/deliverymen/new" component={DeliverymenForm} isPrivate />
      <Route path="/deliverymen" component={Deliverymen} isPrivate />

      <Route path="/recipients/edit/:id" component={RecipientForm} isPrivate />
      <Route path="/recipients/new" component={RecipientForm} isPrivate />
      <Route path="/recipients" component={Recipients} isPrivate />

      <Route path="/problems" component={Problems} isPrivate />
    </Switch>
  );
}
