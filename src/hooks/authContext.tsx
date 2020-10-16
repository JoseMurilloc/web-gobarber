import React, { createContext, useCallback, useState } from "react";
import { useContext } from "react";
import api from "../services/api";

interface AuthState {
  token: string;
  user: object;
}

interface Credentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;

  sigIn(credentials: Credentials): Promise<void>;
  sigOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GBB:token');
    const user = localStorage.getItem('@GBB:user');

    if (token && user) {
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

    setData({ token, user });
  }, [])


  const sigOut = useCallback(() => {

    localStorage.removeItem('@GBB:token');
    localStorage.removeItem('@GBB:user');

    setData({ } as AuthState);
  }, [])

  return (
    <AuthContext.Provider value={{ user: data.user, sigIn, sigOut }}>
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
