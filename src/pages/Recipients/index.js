import React, { useEffect, useState } from 'react';

import api from '~/services/api';
import history from '~/services/history';

import RecipientItem from './RecipientItem';
import AddButton from '~/components/AddButton';

import {
  Container,
  InitialContent,
  RecipientsList,
  ItemsTitles,
} from './styles';

export default function Recipients() {
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    async function loadRecipients() {
      const response = await api.get('recipients');
      const { data } = response;

      setRecipients(data);
    }

    loadRecipients();
  }, []);

  return (
    <Container>
      <InitialContent>
        <strong>Gerenciando destinatários</strong>
        <aside>
          <div>inputSearch</div>
          <AddButton onClick={() => history.push('/')} />
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
            <RecipientItem key={recipient.id} recipient={recipient} />
          ))}
        </tbody>
      </RecipientsList>
    </Container>
  );
}
