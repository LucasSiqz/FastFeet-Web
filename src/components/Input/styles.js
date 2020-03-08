import styled from 'styled-components';

export const InputContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  strong {
    color: #444;
    font-weight: bold;
    text-align: left;
    margin-bottom: 9px;
  }

  input {
    display: flex;
    margin-bottom: 15px;
    height: 45px;
    border-radius: 4px;
    border: 1px solid #dddddd;
    font-size: 16px;
    color: #444;
    padding-left: 15px;
  }
`;
