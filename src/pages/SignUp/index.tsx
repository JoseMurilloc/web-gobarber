import React from 'react';

import { Background, Container, Content } from './styles';
import logo from '../../assets/logo.svg';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { Form } from '@unform/web';

const SignUp: React.FC = () => {
  
  function handleSubmit(data: object) {
    console.log(data);
  }

  return (
    <Container>
      <Background />
      <Content>
        <img src={logo} alt="Gobarber"/>

        <Form onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>

          <Input 
            name="name"
            type="text"
            placeholder="Nome"
            icon={FiUser}
          />

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
            Cadastrar
          </Button>

        </Form>
        
        <a href="/">
          <FiArrowLeft />
          <span>Voltar para logon</span>
        </a>

      </Content>
    </Container>
  );
};

export default SignUp;
