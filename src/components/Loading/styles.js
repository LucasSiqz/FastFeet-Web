import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Spin = styled.div`
  background: #00000020;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: 5px solid #00000000;
  border-top: 5px solid #7d40e7;
  animation: loading 1s linear infinite;

  @keyframes loading {
    100% {
      transform: rotate(360deg);
    }
  }
`;
