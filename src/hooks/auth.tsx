import React, { createContext, useCallback, useState } from "react";
import { useContext } from "react";
import api from "../services/api";

interface User {
  id: string;
  name: string;
  avatar_url: string;
  email: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface Credentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;

  sigIn(credentials: Credentials): Promise<void>;
  sigOut(): void;
  updatedAvatar(user: User): void;
}

/**
 * Criando o contexto incializando vázio
 */
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

/**
 * O Componente de fato que irá encapsular os demais que pertecem
 * a esse contexto de autentificação
 */
const AuthProvider: React.FC = ({ children }) => {
  
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GBB:token');
    const user = localStorage.getItem('@GBB:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) }
    }



    return {} as AuthState;

  });
  

  /**
   * Login de fato (chamando api post "/sessions")
   */
  const sigIn = useCallback(async ({ email, password}) => {
    const response = await api.post('/sessions', {
      email,
      password
    })

    const { token, user } = response.data;

    localStorage.setItem('@GBB:token', token);
    localStorage.setItem('@GBB:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, [])


  const sigOut = useCallback(() => {

    localStorage.removeItem('@GBB:token');
    localStorage.removeItem('@GBB:user');

    setData({ } as AuthState);
  }, [])

  const updatedAvatar = useCallback(async(user: User) => {
    localStorage.setItem('@GBB:user', JSON.stringify(user));

    setData({
      token: data.token,
      user,
    })
  }, [setData, data.token])

  return (
    /**
     * Value são todos  os dados globais ou funções pertecente a esse
     * componente que podem ser acessada pelos demais
     */
    <AuthContext.Provider value={{ user: data.user, sigIn, sigOut, updatedAvatar }}>
      { children }
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {  
    throw new Error('useAuth must be used within a Authentication')
  }

  return context;
}

export { AuthProvider, useAuth }
