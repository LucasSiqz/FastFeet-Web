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

export default function OrderForm({ match }) {
  const { id } = match.params;
  const [orderData, setOrderData] = useState({});
  const ref = useRef(null);

  useEffect(() => {
    async function loadInitialData() {
      const response = await api.get(`orders/${id}`);
      const { data } = response;

      setOrderData(data);
    }
    if (id) {
      loadInitialData();
    }
  }, [id]);

  async function createNewOrder(data) {
    try {
      const schema = Yup.object().shape({
        recipient_id: Yup.string().required(),
        deliveryman_id: Yup.string().required(),
        product: Yup.string().required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { recipient_id, deliveryman_id, product } = data;

      await api.post('orders', {
        recipient_id,
        deliveryman_id,
        product,
      });

      toast.success('Encomenda cadastrado com sucesso!');
      history.push('/orders');
    } catch (err) {
      toast.error('Erro ao cadastrar encomenda, Verifique os dados!');
    }
  }

  async function editOrder(data) {
    try {
      const schema = Yup.object().shape({
        recipient_id: Yup.string().required(),
        deliveryman_id: Yup.string().required(),
        product: Yup.string().required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { recipient_id, deliveryman_id, product } = data;

      await api.put(`orders/${id}`, {
        recipient_id,
        deliveryman_id,
        product,
      });

      toast.success('Entregas editado com sucesso!');
      history.push('/orders');
    } catch (err) {
      toast.error('Erro ao editar entregas, Verifique os dados!');
    }
  }

  function handleSubmmit(data) {
    if (id) {
      editOrder(data);
    } else {
      createNewOrder(data);
    }
  }

  return (
    <Container>
      <InitialContent>
        {id ? (
          <strong>Edição de encomendas</strong>
        ) : (
          <strong>Cadastro de encomendas</strong>
        )}
        <Buttons>
          <BackButton />
          <SaveButton onClick={() => ref.current.submitForm()} />
        </Buttons>
      </InitialContent>
      <FormContainer>
        <Form ref={ref} initialData={orderData} onSubmit={handleSubmmit}>
          <div>
            <Input
              name="recipient_id"
              type="text"
              label="Destinátario"
              placeholder="Ludwig van Beethoven"
            />
            <Input
              name="deliveryman_id"
              type="text"
              label="Entregador"
              placeholder="John Doe"
            />
          </div>
          <Input
            name="product"
            type="text"
            label="Nome do produto"
            placeholder="Yamaha SX7"
            onKeyPress={e =>
              e.key === 'Enter' ? ref.current.submitForm() : null
            }
          />
        </Form>
      </FormContainer>
    </Container>
  );
}

OrderForm.propTypes = {
  match: PropTypes.object,
};

OrderForm.defaultProps = {
  match: null,
};
