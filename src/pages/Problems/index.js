import React, { useEffect, useState } from 'react';

import api from '~/services/api';

import ProblemItem from './ProblemItem';

import { Container, InitialContent, ProblemList, ItemsTitles } from './styles';

export default function Problems() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    async function loadProblems() {
      const response = await api.get('/deliveries/with-problems');
      const { data } = response;

      setProblems(data);
    }

    loadProblems();
  }, []);

  async function updateProblems() {
    const response = await api.get('/deliveries/with-problems');
    const { data } = response;

    setProblems(data);
  }

  return (
    <Container>
      <InitialContent>
        <strong>Problemas na entrega</strong>
      </InitialContent>
      <ProblemList>
        <thead>
          <ItemsTitles>
            <th>Encomenda</th>
            <th>Problema</th>
            <th>Ações</th>
          </ItemsTitles>
        </thead>
        <tbody>
          {problems.map(problem => (
            <ProblemItem
              key={problem.id}
              problem={problem}
              updateProblems={updateProblems}
            />
          ))}
        </tbody>
      </ProblemList>
    </Container>
  );
}
