import { shade } from 'polished';
import styled from 'styled-components';

import signInBackground from '../../assets/sign-in-background.png'

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;


  width: 100%;
  max-width: 700px;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    input {
      background: #232129;
      border-radius: 10px;
      border: 2px solid #232129;
      padding: 16px;
      width: 100%;
      color: #F4EDE8;
      

      & + input {
        margin-top: 8px;
      }
    }

    button {
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
    }

    a {
      color: #F4EDEB;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
       color: ${shade(0.2, '#F4EDEB')}
      }
    }

    a + a {
      color: #FF9000;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;
    }

  }

  > a {
    color: #FF9000;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackground}) no-repeat center;
  background-size: cover; 
`;
