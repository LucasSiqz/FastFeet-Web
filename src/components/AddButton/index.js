import React from 'react';
import PropTypes from 'prop-types';
import { MdAdd } from 'react-icons/md';

import { Container } from './styles';

export default function AddButton({ onClick }) {
  return (
    <Container>
      <button type="button" onClick={() => onClick()}>
        <MdAdd color="#fff" size={22} />
        <strong>Cadastrar</strong>
      </button>
    </Container>
  );
}

AddButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
