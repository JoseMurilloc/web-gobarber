import React, { useCallback, useRef } from 'react';

import { Container, Content, AvatarInput } from './styles';
import { FiMail, FiLock, FiUser, FiCamera, FiArrowLeft } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { Form } from '@unform/web';

import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
}

const Profile: React.FC = () => {
  
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const {user} = useAuth();

  
  const handleSubmit = useCallback(async(data: ProfileFormData) => {
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
      type: 'success',
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
      <header>
       <div>
        <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
       </div>
      </header>
      <Content>

          <Form 
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={{
              name: user.name,
              email: user.email,
            }}
          >

            <AvatarInput>
              <img src="https://avatars.githubusercontent.com/u/43470555?s=460&u=d5a88d8aa43e4fc0f53a417320d1cc6fb4fc13d5&v=4" alt={user.name}/>
              <button type="button">
                <FiCamera />
              </button>
            </AvatarInput>
            
            <h1>Meu perfil</h1>
            
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
              containerStyle={{ marginTop: 24 }}
              name="old_password"
              type="password"
              placeholder="Senha atual"
              icon={FiLock}
            />


            <Input 
              name="password"
              type="password"
              placeholder="Nova Senha"
              icon={FiLock}
            />

            <Input 
              name="password_confirmation"
              type="password"
              placeholder="Confirmar Senha"
              icon={FiLock}
            />    

            <Button type="submit">
              Confirmar mudanças
            </Button>

          </Form>

      </Content>
    </Container>
  );
};

export default Profile;
