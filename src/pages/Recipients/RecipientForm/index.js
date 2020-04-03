import React, { useRef, useEffect, useState } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import history from '~/services/history';
import api from '~/services/api';

import SaveButton from '~/components/SaveButton';
import BackButton from '~/components/BackButton';
import Input from '~/components/Input';

import { Container, InitialContent, Buttons, FormContainer } from './styles';

export default function RecipientForm({ match }) {
  const { id } = match.params;
  const [recipientData, setRecipientData] = useState({});
  const ref = useRef(null);

  useEffect(() => {
    async function loadInitialData() {
      const response = await api.get(`recipients/${id}`);
      const { data } = response;

      setRecipientData(data);
    }
    if (id) {
      loadInitialData();
    }
  }, [id]);

  async function createNewRecipient(data) {
    try {
      const schema = Yup.object().shape({
        recipient_name: Yup.string().required(),
        street: Yup.string().required(),
        number: Yup.string().required(),
        complement: Yup.string(),
        state: Yup.string().required(),
        city: Yup.string().required(),
        cep: Yup.string().required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const {
        recipient_name,
        street,
        number,
        complement,
        state,
        city,
        cep,
      } = data;

      await api.post('recipients', {
        recipient_name,
        street,
        number,
        complement,
        state,
        city,
        cep,
      });

      toast.success('Destinatário cadastrado com sucesso!');
      history.push('/recipients');
    } catch (err) {
      toast.error('Erro ao cadastrar destinatário, Verifique os dados!');
    }
  }

  async function editRecipient(data) {
    try {
      const schema = Yup.object().shape({
        recipient_name: Yup.string().required(),
        street: Yup.string().required(),
        number: Yup.string().required(),
        complement: Yup.string(),
        state: Yup.string().required(),
        city: Yup.string().required(),
        cep: Yup.string().required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const {
        recipient_name,
        street,
        number,
        complement,
        state,
        city,
        cep,
      } = data;

      await api.put(`recipients/${id}`, {
        recipient_name,
        street,
        number,
        complement,
        state,
        city,
        cep,
      });

      toast.success('Destinatário editado com sucesso!');
      history.push('/recipients');
    } catch (err) {
      toast.error('Erro ao editar destinatário, Verifique os dados!');
    }
  }

  function handleSubmit(data) {
    if (id) {
      editRecipient(data);
    } else {
      createNewRecipient(data);
    }
  }

  return (
    <Container>
      <InitialContent>
        {id ? (
          <strong>Edição de destinatários</strong>
        ) : (
          <strong>Cadastro de destinatários</strong>
        )}
        <Buttons>
          <BackButton />
          <SaveButton onClick={() => ref.current.submitForm()} />
        </Buttons>
      </InitialContent>
      <FormContainer>
        <Form ref={ref} initialData={recipientData} onSubmit={handleSubmit}>
          <Input
            name="recipient_name"
            type="text"
            label="Nome"
            placeholder="Ludwig van Beethoven"
          />
          <div>
            <span>
              <Input
                name="street"
                type="text"
                label="Rua"
                placeholder="Rua Beethoven"
              />
            </span>
            <Input
              name="number"
              type="text"
              label="Número"
              placeholder="1729"
            />
            <Input name="complement" type="text" label="Complemento" />
          </div>
          <div>
            <Input
              name="city"
              type="text"
              label="Cidade"
              placeholder="Diadema"
            />
            <Input
              name="state"
              type="text"
              label="Estado"
              placeholder="São Paulo"
            />
            <Input
              name="cep"
              type="text"
              label="cep"
              placeholder="09960-580"
              onKeyPress={e =>
                e.key === 'Enter' ? ref.current.submitForm() : null
              }
            />
          </div>
        </Form>
      </FormContainer>
    </Container>
  );
}

RecipientForm.propTypes = {
  match: PropTypes.object,
};

RecipientForm.defaultProps = {
  match: null,
};
