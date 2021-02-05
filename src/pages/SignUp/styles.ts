import { shade } from 'polished';
import styled, { keyframes } from 'styled-components';

import signUpBackground from '../../assets/sign-up-background.png'

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signUpBackground}) no-repeat center;
  background-size: cover; 
`;


const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

export const AnitationContainer = styled.div`

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  animation: ${appearFromRight} 1s;


  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
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
  }

  a {
    color: #F4EDEB;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      margin-right: 15px;
    }

  }
`;


export const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: 700px;

`;