import styled from 'styled-components';

export const InputContent = styled.div`
  display: flex;
  flex-direction: column;

  strong {
    color: #444;
    font-weight: bold;
    text-align: left;
    margin-bottom: 9px;
  }

  input {
    margin-bottom: 15px;
    height: 45px;
    max-width: 300px;
    border-radius: 4px;
    border: 1px solid #dddddd;
    font-size: 16px;
    color: #444;
    padding-left: 15px;
  }
`;
