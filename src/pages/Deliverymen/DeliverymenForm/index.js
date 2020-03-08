import React, { useRef } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

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
  const ref = useRef(null);

  async function handleSubmmit(data) {
    try {
      const schema = Yup.object().shape({
        avatar: Yup.number(),
        name: Yup.string().required(),
        email: Yup.string()
          .email()
          .required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { name, email, avatar_id } = data;

      await api.post('deliverymans', { name, email, avatar_id });

      toast.success('Entregador cadastrado com sucesso!');
      history.push('/deliverymen');
    } catch (err) {
      toast.error('Erro ao cadastrar entregador, Verifique os dados!');
    }
  }

  return (
    <Container>
      <InitialContent>
        <strong>Cadastro de entregadores</strong>
        <Buttons>
          <BackButton />
          <SaveButton onClick={() => ref.current.submitForm()} />
        </Buttons>
      </InitialContent>
      <FormContainer>
        <Form ref={ref} onSubmit={handleSubmmit}>
          <AvatarContainer>
            <AvatarInput />
          </AvatarContainer>
          <Input name="name" type="text" label="Nome" placeholder="John Doe" />
          <Input
            name="email"
            type="email"
            label="Email"
            placeholder="exemplo@rocketseat.com"
            onKeyPress={e =>
              e.key === 'Enter' ? ref.current.submitForm() : null
            }
          />
        </Form>
      </FormContainer>
    </Container>
  );
}
