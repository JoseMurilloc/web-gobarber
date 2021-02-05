import React, { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';

import { AnitationContainer, Background, Container, Content } from './styles';
import logo from '../../assets/logo.svg';
import { FiLogIn, FiMail } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import { Link } from 'react-router-dom';
import api from '../../services/api';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {

  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback(async(data: ForgotPasswordFormData) => {
   try {

    setLoading(true)
    

    formRef.current?.setErrors({});   
    const scheme = Yup.object().shape({
      email: Yup.string().required('E-mail obrigatório').email('Digite um email válido'),
      password: Yup.string().required('Senha é obrigatória'),
    });

 
    await scheme.validate(data, {
      abortEarly: false
    })

    // Password recovery
    await api.post('/forgot-password', {
      email: data.email
    });

    addToast({
      type: 'success',
      title: 'E-mail de recuperação enviado',
      description: 'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada'
    })
    // history.push('/dashboard');

   } catch(err) {
     if (err instanceof Yup.ValidationError) {
      const errors = getValidationErrors(err)

      formRef.current?.setErrors(errors) 
      
      return;
     }
     
     addToast({
       type: 'error',
       title: 'Error na recocuperação de senha',
       description: 'Ocorreu um erro ao tentar a recuperação de senha.'
     });
   } finally {
     setLoading(true)
   }
  }, [addToast])

  return (
    <Container>
      <Content>
        <AnitationContainer>
          <img src={logo} alt="Gobarber"/>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar senha</h1>

            <Input 
              name="email"
              type="text"
              placeholder="Email"
              icon={FiMail}
            />
            
            
            <Button loading={loading} type="submit">
              Recuperar
            </Button>

          
            <Link to="/">
              <FiLogIn />
              Voltar ao login
            </Link>
          </Form>

        </AnitationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
