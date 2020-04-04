import React, { useRef, useEffect, useState } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import history from '~/services/history';
import api from '~/services/api';

import SaveButton from '~/components/SaveButton';
import BackButton from '~/components/BackButton';
import AvatarInput from '~/components/AvatarInput';
import Input from '~/components/Input';
import Loading from '~/components/Loading';

import {
  Container,
  InitialContent,
  Buttons,
  FormContainer,
  AvatarContainer,
} from './styles';

export default function DeliverymenForm({ match }) {
  const { id } = match.params;
  const [deliverymanData, setDeliverymanData] = useState({});
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    async function loadInitialData() {
      const response = await api.get(`deliverymans/${id}`);
      const { data } = response;

      setDeliverymanData(data);
      if (data.avatar) {
        setUrl(data.avatar.url);
      }
    }
    if (id) {
      loadInitialData();
    }
  }, [id]);

  async function createNewDeliveryman(data) {
    try {
      setLoading(true);
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

      setLoading(false);
      toast.success('Entregador cadastrado com sucesso!');
      history.push('/deliverymen');
    } catch (err) {
      setLoading(false);
      toast.error('Erro ao cadastrar entregador, Verifique os dados!');
    }
  }

  async function editDeliveryman(data) {
    try {
      setLoading(true);
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

      await api.put(`deliverymans/${id}`, { name, email, avatar_id });

      setLoading(false);
      toast.success('Entregador editado com sucesso!');
      history.push('/deliverymen');
    } catch (err) {
      setLoading(false);
      toast.error('Erro ao editar entregador, Verifique os dados!');
    }
  }

  function handleSubmit(data) {
    if (id) {
      editDeliveryman(data);
    } else {
      createNewDeliveryman(data);
    }
  }

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <InitialContent>
            {id ? (
              <strong>Edição de entregadores</strong>
            ) : (
              <strong>Cadastro de entregadores</strong>
            )}
            <Buttons>
              <BackButton />
              <SaveButton onClick={() => ref.current.submitForm()} />
            </Buttons>
          </InitialContent>
          <FormContainer>
            <Form
              ref={ref}
              initialData={deliverymanData}
              onSubmit={handleSubmit}
            >
              <AvatarContainer>
                <AvatarInput name="avatar_id" initialUrl={url} />
              </AvatarContainer>
              <Input
                name="name"
                type="text"
                label="Nome"
                placeholder="John Doe"
              />
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
        </>
      )}
    </Container>
  );
}

DeliverymenForm.propTypes = {
  match: PropTypes.object,
};

DeliverymenForm.defaultProps = {
  match: null,
};
