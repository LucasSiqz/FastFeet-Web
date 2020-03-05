import React, { useState, useEffect } from 'react';
import { MdMoreHoriz } from 'react-icons/md';

import { Container, FirstItem, LastItem, Badge } from './styles';

export default function OrderItem({ order }) {
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    function defineStatus() {
      if (order.canceled_at) {
        return setStatus('CANCELADA');
      }

      if (!order.start_date) {
        return setStatus('PENDENTE');
      }
      if (!order.end_date) {
        return setStatus('RETIRADA');
      }

      return setStatus('ENTREGUE');
    }

    defineStatus();
  }, []);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  return (
    <Container>
      <td>
        <FirstItem>#{order.id}</FirstItem>
      </td>
      <td>
        <div>{order.recipient.recipient_name}</div>
      </td>
      <td>
        <div>{order.deliveryman.name}</div>
      </td>
      <td>
        <div>{order.recipient.city}</div>
      </td>
      <td>
        <div>{order.recipient.state}</div>
      </td>
      <td>
        <div>{status}</div>
      </td>
      <td>
        <LastItem>
          <Badge onClick={handleToggleVisible}>
            <MdMoreHoriz color="#C6C6C6" size={25} />
          </Badge>
        </LastItem>
      </td>
    </Container>
  );
}
