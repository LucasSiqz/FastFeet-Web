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
import AsyncSelectInput from '~/components/AsyncSelectInput';

import { Container, InitialContent, Buttons, FormContainer } from './styles';

export default function OrderForm({ match }) {
  const { id } = match.params;
  const [orderData, setOrderData] = useState({});
  const [deliverymen, setDeliverymen] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    async function loadInitialData() {
      const response = await api.get(`orders/${id}`);
      const { data } = response;

      ref.current.setFieldValue('recipient_id', {
        value: response.data.recipient.id,
        label: response.data.recipient.recipient_name,
      });
      ref.current.setFieldValue('deliveryman_id', {
        value: response.data.deliveryman.id,
        label: response.data.deliveryman.name,
      });

      setOrderData(data);
    }

    async function loadDeliverymen() {
      const response = await api.get('/deliverymans');

      const data = response.data.map(deliveryman => ({
        value: deliveryman.id,
        label: deliveryman.name,
      }));

      setDeliverymen(data);
    }

    async function loadRecipients() {
      const response = await api.get('/recipients');

      const data = response.data.map(recipient => ({
        value: recipient.id,
        label: recipient.recipient_name,
      }));

      setRecipients(data);
    }

    if (id) {
      loadInitialData();
    }

    loadRecipients();
    loadDeliverymen();
  }, [id]);

  const customStylesSelectInput = {
    control: provided => ({
      ...provided,
      height: 45,
      width: '100%',
    }),
  };

  async function filterDeliverymen(inputValue) {
    return deliverymen.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  async function filterRecipients(inputValue) {
    return recipients.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  const deliverymenOptions = inputValue =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(filterDeliverymen(inputValue));
      }, 1000);
    });

  const recipientsOptions = inputValue =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(filterRecipients(inputValue));
      }, 1000);
    });

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

      toast.success('Encomenda cadastrada com sucesso!');
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
          <aside>
            <AsyncSelectInput
              type="text"
              label="Destinatário"
              name="recipient_id"
              placeholder="Ludwig van Beethoven"
              noOptionsMessage={() => 'Nenhum destinatário encontrado'}
              loadOptions={recipientsOptions}
              styles={customStylesSelectInput}
            />
            <AsyncSelectInput
              type="text"
              label="Entregador"
              name="deliveryman_id"
              placeholder="John Doe"
              noOptionsMessage={() => 'Nenhum entregador encontrado'}
              loadOptions={deliverymenOptions}
              styles={customStylesSelectInput}
            />
          </aside>
          <span>
            <Input
              name="product"
              type="text"
              label="Nome do produto"
              placeholder="Yamaha SX7"
              onKeyPress={e =>
                e.key === 'Enter' ? ref.current.submitForm() : null
              }
            />
          </span>
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
