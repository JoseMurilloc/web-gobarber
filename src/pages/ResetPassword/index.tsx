import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';

import { AnitationContainer, Background, Container, Content } from './styles';
import logo from '../../assets/logo.svg';
import { FiLock } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import { useHistory, useLocation } from 'react-router-dom';
import api from '../../services/api';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {


  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();

  const handleSubmit = useCallback(async(data: ResetPasswordFormData) => {
   try {


    formRef.current?.setErrors({});   
    const scheme = Yup.object().shape({
      password: Yup.string().required('Senha obrigatório'),
      password_confirmation: Yup.string().oneOf(
        [Yup.ref('password'), 'Confirmação incorreta'],
      )
    });

 
    await scheme.validate(data, {
      abortEarly: false
    })

    // Reset password

    const token = location.search.replace('?token=','')

    if(token) {
      throw new Error();
    }

    await api.post('/password/reset', {
      password: data.password,
      password_confirmation: data.password_confirmation,
      token,
    })

    history.push('/');

   } catch(err) {
     if (err instanceof Yup.ValidationError) {
      const errors = getValidationErrors(err)

      formRef.current?.setErrors(errors) 
      
      return;
     }
     
     addToast({
       type: 'error',
       title: 'Error ao resetar senha',
       description: 'Ocorreu um erro ao resetar sua senha, cheque as cresdenciais.'
     });
   }
  }, [addToast, history, location])

  return (
    <Container>
      <Content>
        <AnitationContainer>
          <img src={logo} alt="Gobarber"/>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar senha</h1>
            
            <Input 
              name="password"
              type="password"
              placeholder="Nova senha"
              icon={FiLock}
            />

               
            <Input 
              name="password_confirmation"
              type="password"
              placeholder="Confirmação da senha"
              icon={FiLock}
            />

            <Button type="submit">
              Alterar senha
            </Button>

          </Form>

        </AnitationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
