import React from 'react';

import SaveButton from '~/components/SaveButton';
import BackButton from '~/components/BackButton';

import { Container, InitialContent, Buttons } from './styles';

export default function DeliverymenForm() {
  return (
    <Container>
      <InitialContent>
        <strong>Cadastro de entregadores</strong>
        <Buttons>
          <BackButton />
          <SaveButton onClick={() => {}} />
        </Buttons>
      </InitialContent>
    </Container>
  );
}
