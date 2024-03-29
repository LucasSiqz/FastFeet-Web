import React, { useEffect, useState } from 'react';

import api from '~/services/api';
import history from '~/services/history';

import RecipientItem from './RecipientItem';
import AddButton from '~/components/AddButton';
import SearchInput from '~/components/SearchInput';
import Loading from '~/components/Loading';

import {
  Container,
  InitialContent,
  RecipientsList,
  ItemsTitles,
} from './styles';

export default function Recipients() {
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadRecipients() {
      setLoading(true);
      const response = await api.get('recipients');
      const { data } = response;

      setRecipients(data);
      setLoading(false);
    }

    loadRecipients();
  }, []);

  async function updateRecipients() {
    setLoading(true);
    const response = await api.get('recipients');
    const { data } = response;

    setRecipients(data);
    setLoading(false);
  }

  async function onChange(event) {
    const response = await api.get(
      `recipients?recipient=${event.target.value}`
    );
    const { data } = response;

    setRecipients(data);
  }

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <InitialContent>
            <strong>Gerenciando destinatários</strong>
            <aside>
              <SearchInput onChange={onChange} placeholder="destinatários" />
              <AddButton onClick={() => history.push('/recipients/new')} />
            </aside>
          </InitialContent>
          <RecipientsList>
            <thead>
              <ItemsTitles>
                <th>ID</th>
                <th>Nome</th>
                <th>Endereço</th>
                <th>Ações</th>
              </ItemsTitles>
            </thead>
            <tbody>
              {recipients.map(recipient => (
                <RecipientItem
                  key={recipient.id}
                  recipient={recipient}
                  updateRecipients={updateRecipients}
                />
              ))}
            </tbody>
          </RecipientsList>
        </>
      )}
    </Container>
  );
}
