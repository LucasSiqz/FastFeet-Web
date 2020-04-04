import React, { useEffect, useState } from 'react';

import api from '~/services/api';

import ProblemItem from './ProblemItem';

import { Container, InitialContent, ProblemList, ItemsTitles } from './styles';
import Loading from '~/components/Loading';

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadProblems() {
      setLoading(true);
      const response = await api.get('/deliveries/with-problems');
      const { data } = response;

      setProblems(data);
      setLoading(false);
    }

    loadProblems();
  }, []);

  async function updateProblems() {
    setLoading(true);
    const response = await api.get('/deliveries/with-problems');
    const { data } = response;

    setProblems(data);
    setLoading(false);
  }

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
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
        </>
      )}
    </Container>
  );
}
