import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.button`
  
  background: #FF9000;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  width: 100%;
  height: 56px;
  font-weight: 500;
  color: #312E38;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#FF9000')}
  }
`;
