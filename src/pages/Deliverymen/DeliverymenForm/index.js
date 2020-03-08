import React from 'react';
import { Form } from '@unform/web';
// import * as Yup from 'yup';

import SaveButton from '~/components/SaveButton';
import BackButton from '~/components/BackButton';
import AvatarInput from '~/components/AvatarInput';
import Input from '~/components/Input';

import {
  Container,
  InitialContent,
  Buttons,
  FormContainer,
  AvatarContainer,
} from './styles';

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
      <FormContainer>
        <Form>
          <AvatarContainer>
            <AvatarInput />
          </AvatarContainer>
          <Input name="name" type="text" label="Nome" placeholder="John Doe" />
          <Input
            name="email"
            type="email"
            label="Email"
            placeholder="exemplo@rocketseat.com"
          />
        </Form>
      </FormContainer>
    </Container>
  );
}
