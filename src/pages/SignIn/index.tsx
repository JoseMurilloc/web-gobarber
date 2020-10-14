import React from 'react';

import { Background, Container, Content } from './styles';
import logo from '../../assets/logo.svg';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={logo} alt="Gobarber"/>

        <form>
          <h1>Faça seu logon</h1>

          <Input 
            name="email"
            type="text"
            placeholder="Email"
            icon={FiMail}
          />
          
          <Input 
            name="password"
            type="password"
            placeholder="Senha"
            icon={FiLock}
          />

          <Button type="submit">
            Entrar
          </Button>

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
