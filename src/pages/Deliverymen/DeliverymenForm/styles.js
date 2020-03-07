import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  margin-top: 27px;
  margin-left: 270px;
  margin-right: 270px;
`;

export const InitialContent = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;

  strong {
    font-size: 24px;
  }
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  button {
    margin-left: 16px;
  }
`;
