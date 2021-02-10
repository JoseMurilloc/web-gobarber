import React, { ChangeEvent, useCallback, useRef } from 'react';

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
  old_password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const {user, updatedAvatar} = useAuth();

  
  const handleSubmit = useCallback(async(data: ProfileFormData) => {
   try {
    formRef.current?.setErrors({});   
    const scheme = Yup.object().shape({
      name: Yup.string().required('Nome obrigatório'),
      email: Yup.string().required('E-mail obrgatório').email('Digite um email válido'),
      old_password: Yup.string(),
      password: Yup.string().when('old_password', {
        is: val => !!val.length,
        then: Yup.string().required('Campo Obrigatório'),
        otherwise: Yup.string()
      }),
      password_confirmation: Yup.string().when('old_password', {
        is: val => !!val.length,
        then: Yup.string().required('Campo Obrigatório'),
        otherwise: Yup.string()
      }).oneOf(
        [Yup.ref('password'), 'Confirmação incorreta'],
      )
    });

    await scheme.validate(data, {
      abortEarly: false
    })

    const {name, email, old_password, password, password_confirmation} = data;

    const formData = Object.assign({
      name,
      email,
    }, old_password ? {
      old_password,
      password,
      password_confirmation
    } : {})

    const response = await api.put('/profile', formData);

    updatedAvatar(response.data)
    
    history.push('/dashboard');
    
    addToast({
      type: 'success',
      title: 'Perfil atualizado!',
      description: 'Sua atualização do perfil foi realizada com sucesso'
    });


   } catch(err) {
    if (err instanceof Yup.ValidationError) {
      const errors = getValidationErrors(err)

      formRef.current?.setErrors(errors) 
      
      return;
     }
     
     addToast({
       type: 'error',
       title: 'Error na atualização',
       description: 'Ocorreu um erro ao atualizar perfil, tente novamente.'
     });
   }
  }, [addToast, history])

  const handleAvatarChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files) {
      const data = new FormData();

      data.append('avatar', e.target.files[0]);

      api.patch('/users/avatar', data).then((response) => {
        updatedAvatar(response.data);
        addToast({
          type: 'success',
          title: 'Avatar atualizado!'
        })
      })
    }
  }, [addToast, updatedAvatar])

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
              <img src={user.avatar_url} alt={user.name}/>
              <label htmlFor="avatar">
                <FiCamera />
                <input type="file" id="avatar" onChange={handleAvatarChange}/>
              </label>
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
