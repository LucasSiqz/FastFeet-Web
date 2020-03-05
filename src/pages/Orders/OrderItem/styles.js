import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.tr`
  td {
    div {
      max-height: 57px;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 57px;
      font-size: 16px;
      font-weight: 100;
      background: #fff;
      margin-bottom: 21px;
      color: #666666;
    }
  }
`;

export const FirstItem = styled.div`
  padding-left: 13px;
  max-height: 57px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`;

export const LastItem = styled.div`
  text-align: right;
  max-height: 57px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
`;

export const Badge = styled.button`
  padding: 14px 28px;
  background: none;
  border: 0;
  position: relative;
  align-content: center;
  &:hover {
    background: ${darken(0.02, '#fff')};
  }
`;
