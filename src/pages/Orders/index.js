import React, { useEffect, useState } from 'react';

import OrderItem from './OrderItem';

import history from '~/services/history';
import api from '~/services/api';

import { Container, InitialContent, OrdersList, ItemsTitles } from './styles';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function loadOrders() {
      const response = await api.get('orders');
      const { data } = response;

      setOrders(data);
    }

    loadOrders();
  }, []);

  return (
    <Container>
      <InitialContent>
        <strong>Gerenciando encomendas</strong>
        <aside>
          <div>inputSearch</div>
          <div>Add button</div>
        </aside>
      </InitialContent>
      <OrdersList>
        <thead>
          <ItemsTitles>
            <th>ID</th>
            <th>Destinatário</th>
            <th>Entregador</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Status</th>
            <th>Ações</th>
          </ItemsTitles>
        </thead>
        <tbody>
          {orders.map(order => (
            <OrderItem key={order.id} order={order} />
          ))}
        </tbody>
      </OrdersList>
    </Container>
  );
}
