import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdMoreHoriz, MdEdit, MdDeleteForever } from 'react-icons/md';

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
} from './styles';

export default function DeliverymenItem({ deliveryman }) {
  const [visible, setVisible] = useState(false);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  return (
    <Container>
      <td>
        <FirstItem>#{deliveryman.id}</FirstItem>
      </td>
      <td>
        <div>
          {deliveryman.avatar ? (
            <img src={deliveryman.avatar.url} alt={deliveryman.name} />
          ) : (
            <DefaultAvatar name={deliveryman.name} size={35} />
          )}
        </div>
      </td>
      <td>
        <div>{deliveryman.name}</div>
      </td>
      <td>
        <div>{deliveryman.email}</div>
      </td>
      <td>
        <LastItem>
          <OptionsContainer>
            <Badge onClick={handleToggleVisible}>
              <MdMoreHoriz color="#C6C6C6" size={25} />
            </Badge>
            <OptionsList visible={visible}>
              <Option>
                <Button onClick={() => {}}>
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

DeliverymenItem.propTypes = {
  deliveryman: PropTypes.object.isRequired,
};
