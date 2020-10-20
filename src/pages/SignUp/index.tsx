import React, { useCallback, useRef } from 'react';

import { Background, Container, Content, AnitationContainer } from './styles';
import logo from '../../assets/logo.svg';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { Form } from '@unform/web';

import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  
  const handleSubmit = useCallback(async(data: SignUpFormData) => {
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

    await api.post('/users', data);
    
    addToast({
      type: 'sucess',
      title: 'Cadastro realizado!',
      description: 'Você já pode fazer seu logon no GoBarber'
    });

    history.push('/');

   } catch(err) {
    if (err instanceof Yup.ValidationError) {
      const errors = getValidationErrors(err)

      formRef.current?.setErrors(errors) 
      
      return;
     }
     
     addToast({
       type: 'error',
       title: 'Error no cadastro',
       description: 'Ocorreu um erro ao fazer o cadastro, tente novamente.'
     });
   }
  }, [addToast, history])

  return (
    <Container>
      <Background />
      <Content>
        <AnitationContainer>
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

          <Link to="/">
            <FiArrowLeft />
            <span>Voltar para logon</span>
          </Link>
        </AnitationContainer>

      </Content>
    </Container>
  );
};

export default SignUp;
