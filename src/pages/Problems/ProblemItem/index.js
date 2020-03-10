import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

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
  ModalContainer,
} from './styles';

export default function ProblemItem({ problem }) {
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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
                    <strong>VISUALIZAR PROBLEMA</strong>
                    <span>{problem.description}</span>
                  </ModalContainer>
                </Modal>
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
