import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function SearchInput({ onChange, placeholder, ...rest }) {
  return (
    <Container>
      <input
        type="text"
        placeholder={`🔍  Buscar por ${placeholder}`}
        onChange={event => onChange(event)}
        {...rest}
      />
    </Container>
  );
}

SearchInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
