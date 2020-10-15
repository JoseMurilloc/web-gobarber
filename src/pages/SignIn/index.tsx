import React, { useCallback, useContext, useRef } from 'react';
import * as Yup from 'yup';

import { Background, Container, Content } from './styles';
import logo from '../../assets/logo.svg';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';
import { AuthContext } from '../../context/authContext';

interface SiginFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {


  const formRef = useRef<FormHandles>(null);
  const { sigIn } = useContext(AuthContext);
  
  
  const handleSubmit = useCallback(async(data: SiginFormData) => {
   try {
    formRef.current?.setErrors({});   
    const scheme = Yup.object().shape({
      email: Yup.string().required('E-mail obrigatório').email('Digite um email válido'),
      password: Yup.string().required('Senha é obrigatória'),
    });

    await scheme.validate(data, {
      abortEarly: false
    })

    sigIn({ email: data.email, password: data.password });

   } catch(err) {
    
    const errors = getValidationErrors(err)

    formRef.current?.setErrors(errors)   
   }
  }, [sigIn])

  return (
    <Container>
      <Content>
        <img src={logo} alt="Gobarber"/>

        <Form ref={formRef} onSubmit={handleSubmit}>
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
        </Form>

      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
