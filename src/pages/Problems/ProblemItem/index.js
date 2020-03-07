import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdMoreHoriz, MdRemoveRedEye, MdDeleteForever } from 'react-icons/md';

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

export default function ProblemItem({ problem }) {
  const [visible, setVisible] = useState(false);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  return (
    <Container>
      <td>
        <FirstItem>#{problem.id}</FirstItem>
      </td>
      <td>
        <div>
          <p>{problem.description}</p>
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
                <Button onClick={() => {}}>
                  <MdRemoveRedEye color="#8E5BE8" size={16} />
                  <p>Visualizar</p>
                </Button>
              </Option>
              <LastOption>
                <Button onClick={() => {}}>
                  <MdDeleteForever color="#DE3B3B" size={16} />
                  <p>Cancelar encomenda</p>
                </Button>
              </LastOption>
            </OptionsList>
          </OptionsContainer>
        </LastItem>
      </td>
    </Container>
  );
}

ProblemItem.propTypes = {
  problem: PropTypes.object.isRequired,
};
