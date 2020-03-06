import React, { useState, useEffect } from 'react';
import { MdMoreHoriz } from 'react-icons/md';

import { Container, FirstItem, LastItem, Badge } from './styles';

export default function OrderItem({ order }) {
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState({});

  useEffect(() => {
    function defineStatus() {
      if (order.canceled_at) {
        return setStatus({
          text: 'CANCELADA',
          color: '#DE3B3B',
          background: '#FAB0B0',
        });
      }

      if (!order.start_date) {
        return setStatus({
          text: 'PENDENTE',
          color: '#c1bc35',
          background: '#f0f0df',
        });
      }
      if (!order.end_date) {
        return setStatus({
          text: 'RETIRADA',
          color: '#4D85EE',
          background: '#BAD2FF',
        });
      }

      return setStatus({
        text: 'ENTREGUE',
        color: '#2CA42B',
        background: '#DFF0DF',
      });
    }

    defineStatus();
  }, [order]);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  return (
    <Container statusColor={status.color} statusBackground={status.background}>
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
        <div>
          <div>
            <div />
            <strong>{status.text}</strong>
          </div>
        </div>
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
