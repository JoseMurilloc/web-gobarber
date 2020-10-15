import React, { useCallback, useRef } from 'react';

import { Background, Container, Content } from './styles';
import logo from '../../assets/logo.svg';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { Form } from '@unform/web';

import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';

const SignUp: React.FC = () => {
  
  const formRef = useRef<FormHandles>(null);

  
  const handleSubmit = useCallback(async(data: object) => {
   try {
    formRef.current?.setErrors({});   
    const scheme = Yup.object().shape({
      name: Yup.string().required('Nome obrigatório'),
      email: Yup.string().required('E-mail obrgatório').email('Digite um email válido'),
      password: Yup.string().min(6, 'No minimo 6 dígitos'),
    });

    await scheme.validate(data, {
      abortEarly: false
    })

   } catch(err) {
    
    const errors = getValidationErrors(err)

    formRef.current?.setErrors(errors)   
   }
  }, [])

  return (
    <Container>
      <Background />
      <Content>
        <img src={logo} alt="Gobarber"/>

        <Form ref={formRef} onSubmit={handleSubmit}>
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
