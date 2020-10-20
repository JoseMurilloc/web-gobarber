import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';

import { AnitationContainer, Background, Container, Content } from './styles';
import logo from '../../assets/logo.svg';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import { Link, useHistory } from 'react-router-dom';

interface SiginFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {


  const formRef = useRef<FormHandles>(null);
  const { sigIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(async(data: SiginFormData) => {
   try {
    

    /**
     * Formulario validação via Yup scheme
     */

    formRef.current?.setErrors({});   
    const scheme = Yup.object().shape({
      email: Yup.string().required('E-mail obrigatório').email('Digite um email válido'),
      password: Yup.string().required('Senha é obrigatória'),
    });

    /**
     * Checando se ocorreu algum errona validação dos inputs
     */
    await scheme.validate(data, {
      abortEarly: false
    })

    /**
     * Chamando de fato a função enviando as credenciais para logar
     */

    await sigIn({ email: data.email, password: data.password });

    history.push('/dashboard');

   } catch(err) {
     if (err instanceof Yup.ValidationError) {
      const errors = getValidationErrors(err)

      formRef.current?.setErrors(errors) 
      
      return;
     }
     
     addToast({
       type: 'error',
       title: 'Error na autenticação',
       description: 'Ocorreu um erro ao fazer o login, cheque as cresdenciais.'
     });
   }
  }, [sigIn, addToast, history])

  return (
    <Container>
      <Content>
        <AnitationContainer>
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
          
            <Link to="/signup">
              <FiLogIn />
              Criar conta
            </Link>
          </Form>

        </AnitationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
