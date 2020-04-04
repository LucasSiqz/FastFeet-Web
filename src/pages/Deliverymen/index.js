import React, { useEffect, useState } from 'react';

import api from '~/services/api';
import history from '~/services/history';

import DeliverymenItem from './DeliverymenItem';
import AddButton from '~/components/AddButton';
import SearchInput from '~/components/SearchInput';
import Loading from '~/components/Loading';

import {
  Container,
  InitialContent,
  DeliverymenList,
  ItemsTitles,
} from './styles';

export default function Deliverymen() {
  const [deliverymen, setDeliverymen] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadDeliverymen() {
      setLoading(true);
      const response = await api.get('deliverymans');
      const { data } = response;

      setDeliverymen(data);
      setLoading(false);
    }

    loadDeliverymen();
  }, []);

  async function updateDeliverymen() {
    setLoading(true);
    const response = await api.get('deliverymans');
    const { data } = response;

    setDeliverymen(data);
    setLoading(false);
  }

  async function onChange(event) {
    const response = await api.get(`deliverymans?name=${event.target.value}`);
    const { data } = response;

    setDeliverymen(data);
  }

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <InitialContent>
            <strong>Gerenciando entregadores</strong>
            <aside>
              <SearchInput onChange={onChange} placeholder="entregadores" />
              <AddButton onClick={() => history.push('/deliverymen/new')} />
            </aside>
          </InitialContent>
          <DeliverymenList>
            <thead>
              <ItemsTitles>
                <th>ID</th>
                <th>Foto</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Ações</th>
              </ItemsTitles>
            </thead>
            <tbody>
              {deliverymen.map(deliveryman => (
                <DeliverymenItem
                  key={deliveryman.id}
                  deliveryman={deliveryman}
                  updateDeliverymen={updateDeliverymen}
                />
              ))}
            </tbody>
          </DeliverymenList>
        </>
      )}
    </Container>
  );
}
