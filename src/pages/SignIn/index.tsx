import React from 'react';

import { Background, Container, Content } from './styles';
import logo from '../../assets/logo.svg';
import { FiLogIn } from 'react-icons/fi';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={logo} alt="Gobarber"/>

        <form>
          <h1>Faça seu logon</h1>

          <input type="text" placeholder="email"/>
          
          <input type="password" placeholder="senha"/>

          <button type="submit">
            Entrar
          </button>

          <a href="forgot_password">Esqueci minha senha</a>
         
          <a href="">
            <FiLogIn />
            Criar conta
          </a>
        </form>

      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
