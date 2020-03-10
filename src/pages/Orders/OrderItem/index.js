import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import {
  MdMoreHoriz,
  MdEdit,
  MdDeleteForever,
  MdRemoveRedEye,
} from 'react-icons/md';
import { parseISO, format } from 'date-fns';

import history from '~/services/history';
import DefaultAvatar from '~/components/DefaultAvatar';

import {
  Container,
  FirstItem,
  LastItem,
  Badge,
  OptionsList,
  Option,
  LastOption,
  Button,
  OptionsContainer,
  ModalContainer,
  ImageContainer,
  Title,
} from './styles';

export default function OrderItem({ order }) {
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState({});
  const [formatedDates, setFormatedDates] = useState({});

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

    function formatDates() {
      const start_date = order.start_date
        ? format(parseISO(order.start_date), 'dd/MM/yyyy')
        : 'Produto não foi retirado';
      const end_date = order.end_date
        ? format(parseISO(order.end_date), 'dd/MM/yyyy')
        : 'Produto não foi entregue ';
      return setFormatedDates({ start_date, end_date });
    }

    defineStatus();
    formatDates();
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
        <div>
          <p>{order.recipient.recipient_name}</p>
        </div>
      </td>
      <td>
        <div>
          {order.deliveryman.avatar ? (
            <img
              src={order.deliveryman.avatar.url}
              alt={order.deliveryman.name}
            />
          ) : (
            <DefaultAvatar name={order.deliveryman.name} size={35} />
          )}

          <p>{order.deliveryman.name}</p>
        </div>
      </td>
      <td>
        <div>
          <p>{order.recipient.city}</p>
        </div>
      </td>
      <td>
        <div>
          <p>{order.recipient.state}</p>
        </div>
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
          <OptionsContainer>
            <Badge onClick={handleToggleVisible}>
              <MdMoreHoriz color="#C6C6C6" size={25} />
            </Badge>
            <OptionsList visible={visible}>
              <Option>
                <Button
                  onClick={() => {
                    handleToggleVisible();
                    setModalOpen(true);
                  }}
                >
                  <MdRemoveRedEye color="#8E5BE8" size={16} />
                  <p>Visualizar</p>
                </Button>

                <Modal
                  isOpen={modalOpen}
                  onRequestClose={() => {
                    setModalOpen(false);
                  }}
                  ariaHideApp={false}
                  shouldCloseOnOverlayClick
                  shouldCloseOnEsc
                  shouldReturnFocusAfterClose
                  style={{
                    overlay: {
                      background: 'Rgba(0,0,0,0.7)',
                    },
                    content: {
                      background: '#fff',
                      width: 450,
                      top: '50%',
                      left: '50%',
                      right: 'auto',
                      bottom: 'auto',
                      marginRight: '-50%',
                      transform: 'translate(-50%, -50%)',
                    },
                  }}
                >
                  <ModalContainer>
                    <div>
                      <Title>Informações da encomenda</Title>
                      <span>
                        {order.recipient.street}, {order.recipient.number}
                      </span>
                      <span>
                        {order.recipient.city} - {order.recipient.state}
                      </span>
                      <span>{order.recipient.cep}</span>
                    </div>
                    <aside>
                      <Title>Datas</Title>
                      <div>
                        <strong>Retirada: </strong>
                        <span>{formatedDates.start_date}</span>
                      </div>
                      <div>
                        <strong>Entrega: </strong>
                        <span>{formatedDates.end_date}</span>
                      </div>
                    </aside>
                    <Title>Assinatura do destinatário </Title>
                    <div>
                      <ImageContainer>
                        <br />
                        {order.signature_id ? (
                          <img src={order.signature.url} alt="assinatura" />
                        ) : (
                          <span>Não possui assinatura</span>
                        )}
                      </ImageContainer>
                    </div>
                  </ModalContainer>
                </Modal>
              </Option>
              <Option>
                <Button
                  onClick={() => {
                    history.push(`/orders/edit/${order.id}`);
                  }}
                >
                  <MdEdit color="#4D85EE" size={16} />
                  <p>Editar</p>
                </Button>
              </Option>
              <LastOption>
                <Button onClick={() => {}}>
                  <MdDeleteForever color="#DE3B3B" size={16} />
                  <p>Excluir</p>
                </Button>
              </LastOption>
            </OptionsList>
          </OptionsContainer>
        </LastItem>
      </td>
    </Container>
  );
}

OrderItem.propTypes = {
  order: PropTypes.object.isRequired,
};
