import styled from 'styled-components';

export const Container = styled.span`
  border-radius: 50%;
  margin-right: 5px;
  width: ${props => props.size};
  height: ${props => props.size};
  background: ${props => props.background};
  align-items: center;
  justify-content: center;
  display: flex;
  color: ${props => props.color};
`;
