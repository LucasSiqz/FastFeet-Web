import React, { useEffect, useState } from 'react';

import api from '~/services/api';
import history from '~/services/history';

import DeliverymenItem from './DeliverymenItem';
import AddButton from '~/components/AddButton';

import {
  Container,
  InitialContent,
  DeliverymenList,
  ItemsTitles,
} from './styles';

export default function Deliverymen() {
  const [deliverymen, setDeliverymen] = useState([]);

  useEffect(() => {
    async function loadDeliverymen() {
      const response = await api.get('deliverymans');
      const { data } = response;

      setDeliverymen(data);
    }

    loadDeliverymen();
  }, []);

  return (
    <Container>
      <InitialContent>
        <strong>Gerenciando entregadores</strong>
        <aside>
          <div>inputSearch</div>
          <AddButton onClick={() => history.push('/')} />
        </aside>
      </InitialContent>
      <DeliverymenList>
        <thead>
          <ItemsTitles>
            <th>ID</th>
            <th>Foto</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </ItemsTitles>
        </thead>
        <tbody>
          {deliverymen.map(deliveryman => (
            // console.log(deliveryman)
            <DeliverymenItem key={deliveryman.id} deliveryman={deliveryman} />
          ))}
        </tbody>
      </DeliverymenList>
    </Container>
  );
}
